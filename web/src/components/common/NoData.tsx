import { Box, BoxProps, Typography, TypographyProps } from "@mui/material"
import Image from "next/image"
import { FC } from "react"

type IconSize = "xs" | "sm" | "md" | "lg" | "xl"

const iconSizes: Record<IconSize, number> = {
  xs: 40,
  sm: 60,
  md: 80,
  lg: 120,
  xl: 240,
}

type Props = BoxProps & {
  iconSize?: IconSize | number
  direction?: "column" | "column-reverse" | "row" | "row-reverse"
  image?: string
  textProps?: TypographyProps
}

export const NoData: FC<Props> = ({
  iconSize = "lg",
  direction = "column",
  textProps,
  image,
  children,
  ...boxProps
}) => {
  const iconSizeNumber = typeof iconSize === "number" ? iconSize : iconSizes[iconSize]

  return (
    <Box
      {...boxProps}
      sx={{
        display: "flex",
        flexDirection: direction,
        justifyContent: "center",
        alignItems: "center",
        gap: 3 * Math.min(1, iconSizeNumber / iconSizes.lg),
        mt: 2,
        ...boxProps.sx,
      }}
    >
      <Image
        src={image ?? "/img/void.svg"}
        alt=""
        width={iconSizeNumber}
        height={iconSizeNumber}
        draggable="false"
        style={{
          maxWidth: "100%",
          height: "auto",
          marginBottom: "0.5rem",
        }}
      />

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
