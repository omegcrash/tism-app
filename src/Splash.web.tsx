/*
 * This is a reimplementation of what exists in our HTML template files
 * already. Once the React tree mounts, this is what gets rendered first, until
 * the app is ready to go.
 */

import {useEffect, useRef, useState} from 'react'
import Svg, {Circle, Ellipse} from 'react-native-svg'

import {atoms as a, flatten} from '#/alf'

const size = 100

export function Splash({
  isReady,
  children,
}: React.PropsWithChildren<{
  isReady: boolean
}>) {
  const [isAnimationComplete, setIsAnimationComplete] = useState(false)
  const splashRef = useRef<HTMLDivElement>(null)

  // hide the static one that's baked into the HTML - gets replaced by our React version below
  useEffect(() => {
    // double rAF ensures that the React version gets painted first
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const splash = document.getElementById('splash')
        if (splash) {
          splash.remove()
        }
      })
    })
  }, [])

  // when ready, we fade/scale out
  useEffect(() => {
    if (!isReady) return

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    const node = splashRef.current
    if (!node || reduceMotion) {
      setIsAnimationComplete(true)
      return
    }

    const animation = node.animate(
      [
        {opacity: 1, transform: 'scale(1)'},
        {opacity: 0, transform: 'scale(1.5)'},
      ],
      {
        duration: 300,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        fill: 'forwards',
      },
    )
    animation.onfinish = () => setIsAnimationComplete(true)

    return () => {
      animation.cancel()
    }
  }, [isReady])

  const fill = '#14A894' // TISM turquoise

  return (
    <>
      {isReady && children}

      {!isAnimationComplete && (
        <div
          ref={splashRef}
          style={flatten([
            a.fixed,
            a.inset_0,
            a.flex,
            a.align_center,
            a.justify_center,
            // to compensate for the `top: -50px` below
            {transformOrigin: 'center calc(50% - 50px)'},
          ])}>
          {/* TISM Turtle Logo */}
          <Svg
            fill="none"
            viewBox="0 0 64 64"
            style={[a.relative, {width: size, height: size, top: -50}]}>
            {/* Shell */}
            <Ellipse cx="32" cy="34" rx="18" ry="16" fill={fill} />
            <Ellipse
              cx="32"
              cy="34"
              rx="12"
              ry="10"
              fill="none"
              stroke={fill}
              strokeWidth="1.5"
              strokeOpacity="0.4"
            />
            <Circle
              cx="32"
              cy="34"
              r="5"
              fill="none"
              stroke={fill}
              strokeWidth="1.5"
              strokeOpacity="0.4"
            />
            {/* Head */}
            <Ellipse cx="32" cy="14" rx="6" ry="7" fill={fill} />
            {/* Front legs */}
            <Ellipse
              cx="16"
              cy="26"
              rx="5"
              ry="4"
              fill={fill}
              transform="rotate(-30 16 26)"
            />
            <Ellipse
              cx="48"
              cy="26"
              rx="5"
              ry="4"
              fill={fill}
              transform="rotate(30 48 26)"
            />
            {/* Back legs */}
            <Ellipse
              cx="16"
              cy="44"
              rx="5"
              ry="4"
              fill={fill}
              transform="rotate(30 16 44)"
            />
            <Ellipse
              cx="48"
              cy="44"
              rx="5"
              ry="4"
              fill={fill}
              transform="rotate(-30 48 44)"
            />
            {/* Tail */}
            <Ellipse cx="32" cy="54" rx="3" ry="5" fill={fill} />
          </Svg>
        </div>
      )}
    </>
  )
}
