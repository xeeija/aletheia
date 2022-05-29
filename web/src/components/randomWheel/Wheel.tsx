import { FC } from "react"
import { Box, useTheme } from "@mui/material"
import { RandomWheelEntryFragment } from "../../generated/graphql"
import { logistic, pointOnCircle, Sector } from "../../utils/math"

interface Props {
  diameter: number,
  entries?: RandomWheelEntryFragment[],
  colors?: string[]
  fade?: boolean
  // wheelRef?: React.RefObject<SVGSVGElement>
}

export const Wheel: FC<Props> = ({ diameter, entries = [], colors = [], fade }) => {

  const cl: any = ""

  const theme = useTheme()

  colors = colors.length > 0 ? colors : [
    theme.palette.primary.main,
    theme.palette.success.main,
    theme.palette.secondary.main,
    // theme.palette.error.main,
    theme.palette.info.main,
    // theme.palette.warning.main,
  ]

  const segments = entries.length

  const d: Sector = {
    center: { x: diameter / 2, y: diameter / 2 },
    radius: (diameter / 2) - 5,
    startAngle: 0,
    endAngle: segments > 1 ? 360 / segments : 359.99 // 360° angle would be the same as 0°
  }

  const largeArcFlag = d.endAngle - d.startAngle <= 180 ? 0 : 1

  const arrowHeight = diameter * 0.02


  /* M   200       0         A   200     200     0 1        0 400     200     L    200  200  Z
    Move startPosX startPosY Arc radiusX radiusY ? largeArc ? arcPosX arcPosY Line posX posY Close path
    arcPos -> creates an arc from current position (like a cursor) to given arcPos */
  return (
    <Box sx={{
      display: "flex",
      justifyContent: "center",
      "&:not($fadeIn)": {
        opacity: 0,
        visibility: "hidden",
        transition: "opacity 375ms ease-out 5s, visibility 375ms ease-out 5s",
      }
    }}>
      <svg
        width={diameter + arrowHeight * 1.5}
        height={diameter}
        viewBox={`0 0 ${diameter + arrowHeight * 1.5} ${diameter}`}
      // ref={wheelRef}
      >
        <circle cx={d.center.x} cy={d.center.y} r={d.radius}
          style={{
            stroke: theme.palette.background.paper,
            strokeWidth: 4,
            fill: "#8195a833",
          }} />
        <g id="wheel-g" style={{ transformOrigin: "48.51% 50%" }} >

          {entries.map((entry, i) => {

            //#region Previous scaling factors
            // const adjustTextBaseline = logistic(-names.length, 2, -0.5, 2, 0.3)
            // const adjustTextBaseline = 2 * Math.min(1, 30 / names.length * 0.9)

            // const fontSizeNamesMultiplier = logisticInvert(names.length, 1, 0.9, 1, 0.2)
            // const fontSizeNamesMultiplier = Math.max(Math.min(1, 20 / names.length * 1.3), 0.5)
            // const baseFontsize = logistic(name.length / 1.3, diameter / 240, diameter / 440, 1.7, 0.22)
            //#endregion

            // Adjust textpath baseline, so names are better drawn in the middle
            const adjustTextBaseline = logistic({ x: entries.length, max: 1.5, min: 0.4, a: 0.9, b: 30, inverse: true })

            const startPos = pointOnCircle(d.center, d.radius, d.endAngle, i * d.endAngle)
            const endPos = pointOnCircle(d.center, d.radius, d.startAngle, i * d.endAngle)
            const middlePos = pointOnCircle(d.center, d.radius, (d.endAngle / 2) + adjustTextBaseline, i * d.endAngle) // for text path

            // Base fontsize based on length of the name (characters), longer names are smaller
            const baseFontsize = logistic({ x: entry.name.length, max: 2.3, min: 1.2, a: 0.65, b: 15.0, inverse: true }) * (diameter / 600)

            // Scale names based on number of names in the wheel, size is smaller with more entries 
            const fontSizeNamesMultiplier = logistic({ x: entries.length, max: 1, min: 0.6, a: 0.8, b: 34, inverse: true })

            // replace with different color, if last color is the same as the first
            const colorIndex = i % colors.length
            const color = (colorIndex === 0 && i === segments - 1) ? colors[colors.length / 2] : colors[colorIndex]

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
                  } />
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
                    startOffset="92%"
                    fontSize={`${baseFontsize * fontSizeNamesMultiplier}em`}
                    xlinkHref={`#wheel-text-path-${i}`} >
                    {entry.name.length <= 22 ? entry.name : entry.name.substring(0, 21) + "..."}
                  </textPath>
                </text>

                {/* <circle cx={middlePos.x} cy={middlePos.y} r="5" fill={color} /> */}
                {/* <circle cx={startPos.x} cy={startPos.y} r="5" /> */}
                {/* <circle cx={endPos.x} cy={endPos.y} r="5" /> */}
              </g>
            )
          })}

          {/* {points.map((v, i) => <circle cx={v.x} cy={v.y} r="5" fill={colors[i % colors.length]} key={"segment" + i} />)} */}

        </g>

        {/* Middle circle */}
        <circle cx={d.center.x} cy={d.center.y} r={d.radius * 0.1}
          style={{
            fill: "#4b5661",
            stroke: theme.palette.background.default, //"#191d21",
            strokeWidth: 3,
          }}
        />

        <path
          style={{
            fill: theme.palette.primary.dark,
            stroke: theme.palette.background.default, //"#191d21",
            strokeWidth: 3,
          }}
          d={`M ${diameter - arrowHeight * 2.25} ${diameter / 2} l ${arrowHeight * 3.5} ${arrowHeight} l 0 ${arrowHeight * -2} Z`}
        />

      </svg>
    </Box>
  )
}