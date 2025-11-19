import React, { useMemo } from 'react'

interface SplashScreenProps {
  waterLevel: number
  text?: string
  outlineColor?: string
  fillColor?: string
}

const SplashScreen: React.FC<SplashScreenProps> = ({
  waterLevel = 0,
  text = 'WATER',
  outlineColor = '#8338ec',
  fillColor = '#c19bf5',
}) => {
  const normalizedLevel = useMemo(() => {
    return Math.min(Math.max(waterLevel, 0), 100)
  }, [waterLevel])

  return (
    <div className="flex h-screen w-full items-center justify-center overflow-hidden bg-black">
      <div className="relative">
        <svg className="h-[200px] w-[600px]" viewBox="0 0 600 200">
          {/* Define the wave clip path */}
          <defs>
            <clipPath id="waveClip">
              <path
                d={`M0,${100 - normalizedLevel} 
                   C150,${100 - normalizedLevel - 30} 
                     450,${100 - normalizedLevel + 30} 
                     600,${100 - normalizedLevel}
                   L600,200 L0,200 Z`}
              >
                <animate
                  attributeName="d"
                  dur="2s"
                  repeatCount="indefinite"
                  values={`
                    M0,${100 - normalizedLevel} 
                    C150,${100 - normalizedLevel - 30}
                      450,${100 - normalizedLevel + 30}
                      600,${100 - normalizedLevel}
                    L600,200 L0,200 Z;
                    
                    M0,${100 - normalizedLevel} 
                    C150,${100 - normalizedLevel + 30} 
                      450,${100 - normalizedLevel - 30} 
                      600,${100 - normalizedLevel}
                    L600,200 L0,200 Z;
                    
                    M0,${100 - normalizedLevel} 
                    C150,${100 - normalizedLevel - 30} 
                      450,${100 - normalizedLevel + 30} 
                      600,${100 - normalizedLevel}
                    L600,200 L0,200 Z
                  `}
                />
              </path>
            </clipPath>
          </defs>

          {/* Background text (outline) */}
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-[14rem] font-bold"
            style={{
              fill: 'transparent',
              stroke: outlineColor,
              strokeWidth: 2,
              fontFamily: 'Poppins, sans-serif',
            }}
          >
            {text}
          </text>

          {/* Filled text with wave animation */}
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-[14rem] font-bold"
            style={{
              fill: fillColor,
              fontFamily: 'Poppins, sans-serif',
              clipPath: 'url(#waveClip)',
            }}
          >
            {text}
          </text>
        </svg>

        {/* Percentage indicator */}
        <div
          className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-2xl font-medium"
          style={{ color: fillColor }}
        >
          {normalizedLevel}%
        </div>
      </div>
    </div>
  )
}

export default SplashScreen
