import { CustomRewardMenuItemFragment, RandomWheelEntry, RandomWheelWinner, RewardGroup } from "@/generated/graphql"
import { AlertColor } from "@mui/material"
import type { FormikProps } from "formik"
import { Metadata, NextApiRequest, NextApiResponse, ResolvingMetadata } from "next"
import { NextRequest, NextResponse } from "next/server"
import { FC, ReactNode, RefObject } from "react"
import { Socket as SocketDefault } from "socket.io-client"

export type Awaitable<T> = T | Promise<T>
export type Empty = Record<string, never>

// Next

export type ServerComponent<P> = Awaitable<FC<P>>
export type SC<P = Empty> = ServerComponent<P>

// Page, Layout
// SearchParams are only available in a page.tsx
export interface AppPageProps<Params extends object = Empty, SearchParams extends object = Empty> {
  params: Promise<Params>
  searchParams: Promise<SearchParams>
}
export type Page<P extends object = Empty, SP extends object = Empty> = FC<AppPageProps<P, SP>>

export interface AppLayoutProps<Params extends object = Empty> {
  children: ReactNode
  params: Promise<Params>
}

// use like this: type Slots = "a" | "b", default never (no slots, except children)
// https://nextjs.org/docs/app/building-your-application/routing/parallel-routes#slots
export type LayoutSlots<Names extends string = never> = Record<Names, ReactNode>
export type Layout<P extends object = Empty, S extends string = never> = FC<AppLayoutProps<P> & LayoutSlots<S>>

export type ErrorDigest = Error & { digest?: string }
export interface AppErrorProps {
  error: ErrorDigest
  reset: () => void
}

export type MetadataFn<P extends object = Empty, SP extends object = Empty> = (
  props: AppPageProps<P, SP>,
  parent: ResolvingMetadata
) => Awaitable<Metadata>

// Route Handlers (and old API routes)
export type ApiHandler<T = unknown> = (req: NextApiRequest, res: NextApiResponse<T>) => Awaitable<void>

export type RouteHandler<Params extends object = Empty, Body = unknown> = (
  request: NextRequest,
  context: RouteContext<Params>
) => Awaitable<NextResponse<Body> | Response>
export type RouteContext<Params extends object = Empty> = {
  params: Params
}

// Route Segment config
// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
export type RouteConfig = {
  dynamic: "auto" | "force-dynamic" | "error" | "force-static"
  dynamicParams: boolean
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  revalidate: false | 0 | number
  // runtime will usually always be nodejs
  runtime: "nodejs" | "edge"
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  preferredRegion: "auto" | "global" | "home" | string | string[]
  maxDuration: number
  // fetchCache is an advanced option, so it should usually not be used, unless really needed
  fetchCache:
    | "auto"
    | "default-cache"
    | "only-cache"
    | "force-cache"
    | "force-no-store"
    | "default-no-store"
    | "only-no-store"
}

// Custom

export type ThemeColor = "primary" | "secondary" | "success" | "error" | "info" | "warning"
export type ItemSize = "sm" | "md" | "lg" | "xl"

export type SpinResult = {
  winner: RandomWheelWinner
  entry: RandomWheelEntry
  rotation: number
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

// Socket.io

// Events copied from server
export type Socket = SocketDefault<ServerToClientEvents, ClientToServerEvents>

export interface ServerToClientEvents {
  "wheel:entries": (type: "add" | "delete" | "update" | "clear") => void
  // "wheel:winners": (winner: RandomWheelWinner) => void
  "wheel:spin": (spinResult: SpinResult) => void
  "wheel:update": (type: string) => void
  "rewardgroup:pause": (rewardGroup: RewardGroup[], paused: boolean) => void
  "reward:update": (reward: CustomRewardMenuItemFragment) => void
  "rewardlink:delete": () => void
}

export interface ClientToServerEvents {
  "wheel:join": (wheelId: string) => void
  "wheel:entries": (type: "add" | "update", wheelId: string) => void
  "rewardgroup:join": () => void
  "rewardlink:join": (token: string) => void
}

// Alerts, Snackbars

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
