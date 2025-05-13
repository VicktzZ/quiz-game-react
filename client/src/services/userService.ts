import type { User } from "@/types"
import { Service } from "./Service"

class UserService extends Service<User> {
    constructor() {
        super("/user")
    }
}

export const userService = new UserService()
