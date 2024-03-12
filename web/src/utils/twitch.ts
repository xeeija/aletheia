// type for twtich auth params
export type AuthCodeParams = {
  response_type: "code"
  client_id: string
  scope: string
  // boolean, but must be string for SearchParams
  force_verify?: "true" | "false"
  state?: string
  // redirect_uri: string
}

export const scopes = ["channel:read:redemptions", "channel:manage:redemptions"]
