import { NextApiRequest, NextApiResponse } from "next"

export type ThemeColor = "primary" | "secondary" | "success" | "error" | "info" | "warning"

export type ApiHandler<T = any> = (req: NextApiRequest, res: NextApiResponse<T>) => void
