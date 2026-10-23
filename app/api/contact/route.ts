import { NextRequest, NextResponse } from "next/server"

type ContactPayload = {
  opportunityType?: string
  workMode?: string
  timeline?: string
  name?: string
  company?: string
  email?: string
  message?: string
  website?: string
}

const requests = new Map<string, number[]>()
const allowedOptions = {
  opportunityType: new Set(["cdi", "freelance", "healthtech", "consulting"]),
  workMode: new Set(["remote", "marrakech", "casablanca", "relocation"]),
  timeline: new Set(["immediate", "1month", "flexible"]),
}

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : ""
}

function isRateLimited(ip: string) {
  const now = Date.now()
  const recent = (requests.get(ip) ?? []).filter((timestamp) => now - timestamp < 60 * 60 * 1000)
  if (recent.length >= 5) return true
  requests.set(ip, [...recent, now])
  return false
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin")
  if (origin && origin !== request.nextUrl.origin) {
    return NextResponse.json({ error: "Origin not allowed" }, { status: 403 })
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown"
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 })
  }

  let payload: ContactPayload
  try {
    payload = (await request.json()) as ContactPayload
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
  }

  if (clean(payload.website, 200)) {
    return NextResponse.json({ ok: true })
  }

  const name = clean(payload.name, 100)
  const company = clean(payload.company, 120)
  const email = clean(payload.email, 160).toLowerCase()
  const message = clean(payload.message, 2500)
  const opportunityType = clean(payload.opportunityType, 30)
  const workMode = clean(payload.workMode, 30)
  const timeline = clean(payload.timeline, 30)
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (
    name.length < 2 ||
    !emailPattern.test(email) ||
    !allowedOptions.opportunityType.has(opportunityType) ||
    !allowedOptions.workMode.has(workMode) ||
    !allowedOptions.timeline.has(timeline)
  ) {
    return NextResponse.json({ error: "Invalid form fields" }, { status: 422 })
  }

  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM_EMAIL
  const to = process.env.CONTACT_TO_EMAIL ?? "sohaiblaarichi112@gmail.com"

  if (!apiKey || !from) {
    return NextResponse.json({ error: "Email service is not configured" }, { status: 503 })
  }

  const text = [
    "Nouveau contact depuis le portfolio",
    "",
    `Nom : ${name}`,
    `Entreprise : ${company || "Non précisée"}`,
    `Email : ${email}`,
    `Opportunité : ${opportunityType}`,
    `Mode de travail : ${workMode}`,
    `Démarrage : ${timeline}`,
    "",
    "Message :",
    message || "Aucun message complémentaire.",
  ].join("\n")

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `Portfolio — ${opportunityType} — ${name}${company ? ` / ${company}` : ""}`,
      text,
    }),
  })

  if (!response.ok) {
    return NextResponse.json({ error: "Delivery failed" }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
