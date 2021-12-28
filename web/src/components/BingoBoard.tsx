import { Grid } from "@mui/material"
import React from "react"

interface Props {
  items: string[]
}

export const BingoBoard: React.FC<Props> = ({ items }) => {

  const dimens = Math.ceil(Math.sqrt(items.length))
  const cell = 140

  return (
    <>
      <h3 style={{ marginTop: 0 }}>Bonko! Dimensions: {dimens}x{dimens} ({items.length})</h3>

      {/* height: 75vh */}
      <svg viewBox={`-1 -1 ${dimens * cell + 2} ${dimens * cell + 2}`} width="auto" height="680px">
        {items.map((item, i) => {
          const x = (i % dimens) * cell
          const y = Math.floor(i / dimens) * cell

          return (
            <g key={i}>
              <rect id={`bingoItem-${i}`} x={x} y={y} width={cell} height={cell} fill="transparent" stroke="#ddd"></rect>

              {/* foreignObject renders HTML elements in SVG */}
              <foreignObject x={x} y={y} width={cell} height={cell}>
                <Grid container justifyContent="center" alignItems="center" sx={{
                  textAlign: "center",
                  height: "100%",
                  p: 0.5,
                  fontSize: 20,
                  lineHeight: 1.3,
                  color: "#ddd",
                }}>
                  {item}
                </Grid>
              </foreignObject>
            </g>
          )
        })}

      </svg>
    </>
  )
}