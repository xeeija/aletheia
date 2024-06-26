import { CustomRewardMenuItemFragment, RandomWheelEntry, RandomWheelWinner, RewardGroup } from "@/generated/graphql"
import { AlertColor } from "@mui/material"
import { FormikProps } from "formik"
import { NextApiRequest, NextApiResponse } from "next"
import { RefObject } from "react"
import { Socket as SocketDefault } from "socket.io-client"

export type ThemeColor = "primary" | "secondary" | "success" | "error" | "info" | "warning"

export type ItemSize = "sm" | "md" | "lg" | "xl"

export type ApiHandler<T = unknown> = (req: NextApiRequest, res: NextApiResponse<T>) => void | Promise<void>

export type Awaitable<T> = T | Promise<T>

export type SpinResult = {
  winner: RandomWheelWinner
  entry: RandomWheelEntry
  rotation: number
}

// Events copied from server
export type Socket = SocketDefault<ServerToClientEvents, ClientToServerEvents>

export interface ServerToClientEvents {
  "wheel:entries": (type: "add" | "delete" | "update" | "clear") => void
  // "wheel:winners": (winner: RandomWheelWinner) => void
  "wheel:spin": (spinResult: SpinResult) => void
  "wheel:update": (type: string) => void
  "rewardgroup:pause": (rewardGroup: RewardGroup[], paused: boolean) => void
  "reward:update": (reward?: CustomRewardMenuItemFragment) => void
}

export interface ClientToServerEvents {
  "wheel:join": (wheelId: string) => void
  "wheel:entries": (type: "add" | "update", wheelId: string) => void
  "rewardgroup:join": () => void
  "rewardlink:join": (token: string) => void
}

export type FormDialogProps<T> = {
  formRef?: RefObject<FormikProps<T>>
  actionsRef?: RefObject<Element>
  onClose?: () => void
}

export type TwitchError = {
  status: number
  error: string
  message: string
}

export type RewardLinkType = "enable" | "pause"

export type AlertVariant = AlertColor | "default"

export type AlertBaseProps = {
  closeable?: boolean
}

declare module "notistack" {
  interface VariantOverrides {
    // adds `reportComplete` variant and specifies the
    // "extra" props it takes in options of `enqueueSnackbar
    default: AlertBaseProps
    success: AlertBaseProps
    info: AlertBaseProps
    warning: AlertBaseProps
    error: AlertBaseProps
  }
}
