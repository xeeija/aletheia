import { FC } from "react"
import { Box, ListItemText, MenuItem, MenuItemProps } from "@mui/material"

type Props = MenuItemProps & {
  name?: string | null
  colors?: string | string[]
  noMenuItem?: boolean
}

export const ColorMenuItem: FC<Props> = ({ name, colors, noMenuItem, value, ...props }) => {
  const colorList = typeof colors === "string" ? [colors] : colors
  const label = (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        gap: 2,
      }}
    >
      <ListItemText>{name}</ListItemText>
      <Box
        sx={{
          width: "min(50%, 180px)",
          height: 24,
          display: "flex",
          flex: "0 1 auto",
        }}
      >
        {colorList?.map((color, i) => (
          <Box
            key={i}
            sx={{
              width: "100%",
              backgroundColor: color,
              borderTopLeftRadius: (t) => (i === 0 ? t.shape.borderRadius : undefined),
              borderBottomLeftRadius: (t) => (i === 0 ? t.shape.borderRadius : undefined),
              borderTopRightRadius: (t) => (i === colorList.length - 1 ? t.shape.borderRadius : undefined),
              borderBottomRightRadius: (t) => (i === colorList.length - 1 ? t.shape.borderRadius : undefined),
            }}
          />
        ))}
      </Box>
    </Box>
  )

  return noMenuItem ? label : <MenuItem {...props}>{label}</MenuItem>
}
