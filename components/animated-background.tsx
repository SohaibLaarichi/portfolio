export function AnimatedBackground() {
  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10 overflow-hidden bg-background">
      {/* Ambient Aurora Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_12%,rgba(99,102,241,0.18),transparent_32rem),radial-gradient(circle_at_82%_22%,rgba(168,85,247,0.14),transparent_28rem),radial-gradient(circle_at_50%_75%,rgba(6,182,212,0.10),transparent_36rem)]" />

      {/* Modern Engineering Dot/Tech Grid */}
      <div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.07] [background-image:linear-gradient(rgba(99,102,241,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.5)_1px,transparent_1px)] [background-size:40px_40px]" />

      {/* Top subtle fade */}
      <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-primary/10 via-primary/2 to-transparent" />
      
      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-background to-transparent" />
    </div>
  )
}
