export function AnimatedBackground() {
  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10 overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_14%,rgba(14,165,233,0.16),transparent_28rem),radial-gradient(circle_at_84%_24%,rgba(16,185,129,0.10),transparent_24rem),linear-gradient(180deg,rgba(255,255,255,0.02),transparent)]" />
      <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(125,211,252,0.55)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,0.55)_1px,transparent_1px)] [background-size:48px_48px]" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-primary/8 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-background to-transparent" />
    </div>
  )
}
