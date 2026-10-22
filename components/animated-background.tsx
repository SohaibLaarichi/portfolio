"use client"

export function AnimatedBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-background transition-colors duration-500"
    >
      {/* Primary Ambient Studio Lighting (Warm Amber Halo from Top) */}
      <div
        className="absolute inset-0 opacity-80 dark:opacity-90"
        style={{
          background:
            "radial-gradient(ellipse 70% 45% at 50% -5%, var(--tint-w), transparent 70%), radial-gradient(ellipse 55% 40% at 88% 60%, var(--tint-c), transparent 65%)",
        }}
      />

      {/* Clean, Refined Architectural Grid (Flat & Elegant, Non-Distracting) */}
      <div
        className="absolute inset-0 opacity-[0.035] dark:opacity-[0.055]"
        style={{
          backgroundImage:
            "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "radial-gradient(ellipse 75% 65% at 50% 25%, #000 20%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 65% at 50% 25%, #000 20%, transparent 80%)",
        }}
      />

      {/* Soft Vignette Depth Blends */}
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-background via-background/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-background via-background/40 to-transparent" />
    </div>
  )
}
