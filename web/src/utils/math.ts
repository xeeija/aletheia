export interface Point {
  x: number
  y: number
}

export interface Sector {
  center: Point
  radius: number
  startAngle: number
  endAngle: number
}

export const pointOnCircle = (center: Point, radius: number, angleDeg: number, angleOffset = 0): Point => {
  // 90° offset ccw by default, so angle goes from the the top, not right of the circle
  // custom offset to rotate cw
  const angleRad = ((angleDeg - 90 + angleOffset) * Math.PI) / 180
  return {
    x: Math.cos(angleRad) * radius + center.x,
    y: Math.sin(angleRad) * radius + center.y,
  }
}

interface LogisticOptions {
  x: number
  max: number
  min: number
  b?: number
  a?: number
  inverse?: boolean
}

// const logistic = (x: number, max: number, min: number, a: number, k: number) => min + max - (max / (1 + a * Math.exp(-k * x)))

// f(x), a: 0-1, strength of curvature, b: horizontal offset
export const logistic = ({ x, max, min, a = 0.5, b = 0, inverse = false }: LogisticOptions) =>
  min + (max - min) / (1 + a ** ((x - b) * (inverse ? -1 : 1)))
