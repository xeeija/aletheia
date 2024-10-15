"use client"

import { RandomWheelEntryFragment } from "@/generated/graphql"
import { Sector, logistic, pointOnCircle } from "@/utils/math"
import { Box, useTheme } from "@mui/material"
import { FC } from "react"

interface Props {
  diameter: number
  entries?: RandomWheelEntryFragment[]
  colors?: string[]
  fade?: boolean
  rotation?: number
  spinning?: boolean
  spinDuration?: number
  popout?: boolean
  // wheelRef?: React.RefObject<SVGSVGElement>
  behindBackdrop?: boolean
}

export const Wheel: FC<Props> = ({
  diameter,
  entries = [],
  colors = [],
  rotation = 0,
  spinning,
  spinDuration = 8000,
  popout,
  behindBackdrop,
}) => {
  // const spinClickSounds = useMemo(() => Array(10).fill(0).map((v) => new Audio(`/audio/boob6-${v}.wav`)), [])

  // TODO: Use WebAPI instead
  // https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API

  // useEffect(() => {
  //   const spinClickSound = new Audio("/audio/boob.wav")

  //   const observer = new IntersectionObserver((entries) => {
  //     entries.forEach((entry) => {
  //       // TODO: Fix initial sound when starting, and sound when adding/removing
  //       // getSpinning() function instead, so spinning is evaluated only once the callback is executed?
  //       if (!spinning) {
  //         return
  //       }

  //       if (entry.isIntersecting && !entry.target.classList.contains("item-intersect")) {
  //         entry.target.classList.add("item-intersect")
  //         spinClickSound.play()

  //       } else if (!entry.isIntersecting && entry.target.classList.contains("item-intersect")) {
  //         entry.target.classList.remove("item-intersect")
  //       }
  //     })
  //   },
  //     {
  //       root: document.querySelector("#wheel-svg"),
  //       // top right bottom left
  //       rootMargin: "-50% 0px 0px -50%",
  //       threshold: 0.5,
  //     })

  //   document.querySelectorAll(".wheel-item-start").forEach((target) => observer.observe(target))

  //   return () => observer.disconnect()
  // })

  // TODO: refactor to server component when mui theme is updated to work with Server Components
  const theme = useTheme()

  colors =
    colors.length > 0
      ? colors
      : [
          theme.palette.primary.main,
          theme.palette.success.main,
          theme.palette.secondary.main,
          // theme.palette.error.main,
          theme.palette.info.main,
          // theme.palette.warning.main,
        ]

  const segments = entries.reduce((acc, entry) => acc + entry.weight, 0)

  const d: Sector = {
    center: { x: diameter / 2, y: diameter / 2 },
    radius: diameter / 2 - 5,
    startAngle: 0,
    endAngle: segments > 1 ? 360 / segments : 359.99, // 360° angle would be the same as 0°
  }

  const arrowHeight = diameter * 0.02
  const arrowWidth = arrowHeight * 1.5

  const segmentPos = entries.reduce<number[]>((acc, entry, i) => [...acc, (acc[i] ?? 0) + entry.weight], [0])

  const winnerMarkerPath = `M ${diameter - arrowHeight * 2.25} ${diameter / 2} l ${arrowHeight * 3.5} ${arrowHeight} l 0 ${arrowHeight * -2} Z`

  /* M   200       0         A   200     200     0 1        0 400     200     L    200  200  Z
    Move startPosX startPosY Arc radiusX radiusY ? largeArc ? arcPosX arcPosY Line posX posY Close path
    arcPos -> creates an arc from current position (like a cursor) to given arcPos */
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        "&:not($fadeIn)": {
          opacity: 0,
          visibility: "hidden",
          transition: "opacity 375ms ease-out 5s, visibility 375ms ease-out 5s",
        },
      }}
    >
      <svg
        width={diameter + arrowWidth}
        height={diameter}
        viewBox={`0 0 ${diameter + arrowWidth} ${diameter}`}
        style={{
          ...(popout && {
            marginLeft: arrowWidth,
          }),
        }}
        // ref={wheelRef}
        id="wheel-svg"
      >
        <circle
          cx={d.center.x}
          cy={d.center.y}
          r={d.radius}
          style={{
            stroke: theme.palette.background.paper,
            strokeWidth: 4,
            fill: "#8195a833",
          }}
        />
        <g
          id="wheel-g"
          style={{
            transformOrigin: "48.51% 50%",
            transform: `rotate(${rotation}deg)`,
            ...(spinning && {
              transition: theme.transitions.create("transform", {
                duration: spinDuration,
                easing: "cubic-bezier(0.12, 0, 0.25, 1)",
                delay: 500,
              }),
            }),
          }}
        >
          {entries.map((entry, i) => {
            //#region Previous scaling factors
            // const adjustTextBaseline = logistic(-names.length, 2, -0.5, 2, 0.3)
            // const adjustTextBaseline = 2 * Math.min(1, 30 / names.length * 0.9)

            // const fontSizeNamesMultiplier = logisticInvert(names.length, 1, 0.9, 1, 0.2)
            // const fontSizeNamesMultiplier = Math.max(Math.min(1, 20 / names.length * 1.3), 0.5)
            // const baseFontsize = logistic(name.length / 1.3, diameter / 240, diameter / 440, 1.7, 0.22)
            //#endregion

            // Adjust textpath baseline, so names are better drawn in the middle - 0.0 max
            const adjustTextBaseline = logistic({ x: entries.length, max: 1.2, min: 0.4, a: 0.9, b: 30, inverse: true })

            const largeArcFlag = d.endAngle * entry.weight - d.startAngle <= 180 ? 0 : 1

            const angleOffset = segmentPos[i] * d.endAngle

            const startPos = pointOnCircle(d.center, d.radius, d.endAngle * entry.weight, angleOffset)
            const endPos = pointOnCircle(d.center, d.radius, d.startAngle, angleOffset)
            const middlePos = pointOnCircle(
              d.center,
              d.radius,
              (d.endAngle * entry.weight) / 2 + adjustTextBaseline,
              angleOffset
            ) // for text path

            // Note: logistic values come from trial and error

            // Base fontsize based on length of the name (characters), longer names are smaller
            const baseFontsize =
              logistic({ x: entry.name.length, max: 2.3, min: 1.2, a: 0.65, b: 15.0, inverse: true }) * (diameter / 600)

            // Scale names based on number of names in the wheel, size is smaller with more entries
            const fontSizeNamesMultiplier = logistic({
              x: entries.length,
              max: 1,
              min: 0.75,
              a: 0.8,
              b: 36,
              inverse: true,
            })

            const fontSizeWeightMultiplier = logistic({
              x: segments / entry.weight,
              max: 1,
              min: 0.7,
              a: 0.8,
              b: 32,
              inverse: true,
            })

            const textLengthMultiplier = logistic({ x: entries.length, max: 1.5, min: 1, a: 0.8, b: 32 })

            const fontSizeNamesLengthAdjust = logistic({
              x: Math.sqrt(entries.length * entry.name.length),
              max: 1.33,
              min: 1,
              a: 0.7,
              b: 27,
            })

            // replace with different color, if last color is the same as the first
            const colorIndex = i % colors.length
            const color =
              colorIndex === 0 && i === entries.length - 1 ? colors[~~(colors.length / 2)] : colors[colorIndex]

            return (
              <g key={`wheel-g-${i}`}>
                <path
                  style={{
                    stroke: theme.palette.background.default, //"#191d21",
                    strokeWidth: 1.5,
                    fillOpacity: 0.8,
                  }}
                  fill={color}
                  d={
                    `M ${startPos.x} ${startPos.y} ` +
                    `A ${d.radius} ${d.radius} 0 ${largeArcFlag} 0 ${endPos.x} ${endPos.y} ` +
                    `L ${d.center.x} ${d.center.y} Z`
                  }
                />
                <defs>
                  <path
                    id={"wheel-text-path-" + i}
                    d={`M ${d.center.x} ${d.center.y} L ${middlePos.x} ${middlePos.y} `}
                  />
                </defs>
                <text
                  style={{
                    fill: theme.palette.background.default, //"#191d21",
                    // fontSizeAdjust: 0.47, // 0.45,
                  }}
                >
                  <textPath
                    // TODO: make text as big as possiblee
                    textAnchor="end"
                    dominantBaseline="middle"
                    startOffset="93%"
                    fontSize={`${baseFontsize * fontSizeNamesMultiplier * fontSizeWeightMultiplier * fontSizeNamesLengthAdjust}em`}
                    xlinkHref={`#wheel-text-path-${i}`}
                  >
                    {entry.name.length <= 22 * textLengthMultiplier ? entry.name : entry.name.substring(0, 21) + "..."}
                  </textPath>
                </text>

                {/* Trigger Element for "clack" sound when spinning */}
                <circle
                  className={`wheel-item-start start-${i}`}
                  cx={startPos.x}
                  cy={startPos.y}
                  r="5"
                  fill={color}
                  stroke="#000"
                  visibility="hidden"
                />

                {/* <circle cx={middlePos.x} cy={middlePos.y} r="5" fill={color} /> */}
                {/* <circle cx={startPos.x} cy={startPos.y} r="5" /> */}
                {/* <circle cx={endPos.x} cy={endPos.y} r="5" /> */}
              </g>
            )
          })}

          {/* {points.map((v, i) => <circle cx={v.x} cy={v.y} r="5" fill={colors[i % colors.length]} key={"segment" + i} />)} */}
        </g>

        {/* Middle circle */}
        <circle
          cx={d.center.x}
          cy={d.center.y}
          r={d.radius * 0.1}
          style={{
            fill: "#4b5661",
            stroke: theme.palette.background.default, //"#191d21",
            strokeWidth: 3,
          }}
        />

        {/* Winner marker trinagle */}
        <path
          id="winner-marker-fill"
          style={{
            fill: theme.palette.primary.dark,
            // stroke: theme.palette.background.default, //"#191d21",
            strokeWidth: 0,
          }}
          d={winnerMarkerPath}
        />
        {popout && (
          <path
            id="winner-marker-backdrop"
            style={{
              fill: "#39314e", // primary.main with darker backdrop (black 0.5 opacity)
              stroke: theme.palette.background.default, //"#191d21",
              strokeWidth: 0,
              opacity: behindBackdrop ? 1 : 0,
              transition: "opacity 225ms cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            d={`M ${diameter - arrowHeight * 2.25 + 26.5} ${diameter / 2 - 5.5} l 0 ${arrowHeight - 2} l ${arrowHeight * 1.7} ${arrowHeight * 0.5} l 0 ${arrowHeight * -2} Z`}
          />
        )}
        <path
          id="winner-marker-stroke"
          style={{
            fill: "transparent",
            // darker stroke when behind backdrop, like fill above
            stroke: behindBackdrop ? "#0c0f12" : theme.palette.background.default, //"#191d21",
            strokeWidth: 3,
            transition: "stroke 225ms cubic-bezier(0.4, 0, 0.2, 1)",
          }}
          d={winnerMarkerPath}
        />
      </svg>
    </Box>
  )
}
