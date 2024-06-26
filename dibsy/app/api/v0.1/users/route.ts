import * as peersy from "peersy"
import { NextRequest } from "next/server"
import { res, notAllowed } from "@/utils"
import * as crypto from "crypto"
import * as dibsy from "@/dibsy"
import * as api from "@/api"

export async function POST(req: NextRequest) {
    if (!req.body) {
        return res(400, "Request body is not present.")
    }

    let rdata: api.UsersPOST
    try {
        rdata = await req.json()
    } catch (e) {
        return res(400, "Request body does not follow the `UsersPOST` format OR required arguments were not passed. Check the documentation.")
    }

    let salt = crypto.randomBytes(16).toString("hex")

    let user: dibsy.User = {
        username: rdata.username,
        password: `${salt}:${crypto.scryptSync(rdata.password, salt, 64).toString("hex")}`,
        bot: false,
        posts: [],
        comments: []
    }
    user.profile = {
        name: rdata.username,
        avatar: "default",
        user: user
    }

    let contentified = peersy.makeContent(user)

    return res(201, "Success.", contentified)
}

export { notAllowed as GET }
export { notAllowed as PUT }
export { notAllowed as PATCH }
export { notAllowed as DELETE }
export { notAllowed as HEAD }
export { notAllowed as OPTIONS }