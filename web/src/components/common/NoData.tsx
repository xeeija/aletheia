import { Box, BoxProps, Typography, TypographyProps } from "@mui/material"
import Image from "next/image"
import { FC } from "react"

type IconSize = "xs" | "sm" | "md" | "lg"

const iconSizes: Record<IconSize, number> = {
  xs: 40,
  sm: 60,
  md: 80,
  lg: 120,
}

type Props = BoxProps & {
  iconSize?: IconSize | number
  direction?: "column" | "column-reverse" | "row" | "row-reverse"
  textProps?: TypographyProps
}

export const NoData: FC<Props> = ({ iconSize = "lg", direction = "column", textProps, children, ...boxProps }) => {
  const iconSizeNumber = typeof iconSize === "number" ? iconSize : iconSizes[iconSize]

  return (
    <Box
      {...boxProps}
      sx={{
        display: "flex",
        flexDirection: direction,
        justifyContent: "center",
        alignItems: "center",
        gap: 3 * (iconSizeNumber / iconSizes.lg),
        mt: 2,
        ...boxProps.sx,
      }}
    >
      <Image src="/img/void.svg" alt="" width={iconSizeNumber} height={iconSizeNumber} draggable="false" />

      {typeof children === "object" ? (
        children
      ) : (
        <Typography variant="h6" color="text.secondary" gutterBottom {...textProps}>
          {children}
        </Typography>
      )}
    </Box>
  )
}
