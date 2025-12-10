// Kurdish Sun Icon - 21-ray sun from the Kurdish flag
// The 21 rays represent Newroz (March 21st), the Kurdish New Year

interface KurdishSunIconProps {
  className?: string
}

export function KurdishSunIcon({ className = 'w-6 h-6' }: KurdishSunIconProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="currentColor">
      {/* Center circle */}
      <circle cx="50" cy="50" r="20" />

      {/* 21 rays - representing March 21st (Newroz) */}
      {Array.from({ length: 21 }).map((_, i) => {
        const angle = (i * 360) / 21 - 90 // Start from top
        const rad = (angle * Math.PI) / 180
        const innerRadius = 24
        const outerRadius = 42
        // Round to 2 decimal places to prevent hydration mismatches
        const x1 = Math.round((50 + innerRadius * Math.cos(rad)) * 100) / 100
        const y1 = Math.round((50 + innerRadius * Math.sin(rad)) * 100) / 100
        const x2 = Math.round((50 + outerRadius * Math.cos(rad)) * 100) / 100
        const y2 = Math.round((50 + outerRadius * Math.sin(rad)) * 100) / 100

        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
          />
        )
      })}
    </svg>
  )
}
