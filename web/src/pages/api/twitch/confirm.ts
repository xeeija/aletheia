import { ApiHandler } from "../../../types"

const handler: ApiHandler = async (_, res) => {
  res.redirect("/settings")
}

export default handler