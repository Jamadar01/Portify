import { useRef, useState } from 'react'

export default function TiltCard({ children, className, style, intensity = 14 }) {
  const ref = useRef(null)
  const [ts, setTs] = useState({})
  const [glare, setGlare] = useState({ x: 50, y: 50, op: 0 })

  function onMove(e) {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top) / r.height
    setTs({
      transform: `perspective(800px) rotateX(${(0.5 - y) * intensity}deg) rotateY(${(x - 0.5) * intensity}deg) scale3d(1.04,1.04,1.04)`,
      transition: 'transform 0.08s linear',
    })
    setGlare({ x: x * 100, y: y * 100, op: 0.15 })
  }

  function onLeave() {
    setTs({ transform: 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)', transition: 'transform 0.4s ease' })
    setGlare(g => ({ ...g, op: 0 }))
  }

  return (
    <div ref={ref} className={className}
      style={{ ...style, ...ts, transformStyle: 'preserve-3d', willChange: 'transform', position: 'relative' }}
      onMouseMove={onMove} onMouseLeave={onLeave}>
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 'inherit', pointerEvents: 'none', zIndex: 5,
        background: `radial-gradient(ellipse at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.op}) 0%, transparent 65%)`,
      }} />
      {children}
    </div>
  )
}
