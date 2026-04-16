import React from 'react'

export function Turtle(props: React.SVGAttributes<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      {...props}>
      {/* Shell */}
      <ellipse cx="12" cy="12.75" rx="6.75" ry="6" fill="currentColor" />
      {/* Shell pattern */}
      <ellipse
        cx="12"
        cy="12.75"
        rx="4.5"
        ry="3.75"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
        strokeOpacity="0.4"
      />
      <circle
        cx="12"
        cy="12.75"
        r="1.875"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
        strokeOpacity="0.4"
      />
      {/* Head */}
      <ellipse cx="12" cy="5.25" rx="2.25" ry="2.625" fill="currentColor" />
      {/* Front left leg */}
      <ellipse
        cx="6"
        cy="9.75"
        rx="1.875"
        ry="1.5"
        fill="currentColor"
        transform="rotate(-30 6 9.75)"
      />
      {/* Front right leg */}
      <ellipse
        cx="18"
        cy="9.75"
        rx="1.875"
        ry="1.5"
        fill="currentColor"
        transform="rotate(30 18 9.75)"
      />
      {/* Back left leg */}
      <ellipse
        cx="6"
        cy="16.5"
        rx="1.875"
        ry="1.5"
        fill="currentColor"
        transform="rotate(30 6 16.5)"
      />
      {/* Back right leg */}
      <ellipse
        cx="18"
        cy="16.5"
        rx="1.875"
        ry="1.5"
        fill="currentColor"
        transform="rotate(-30 18 16.5)"
      />
      {/* Tail */}
      <ellipse cx="12" cy="20.25" rx="1.125" ry="1.875" fill="currentColor" />
    </svg>
  )
}
