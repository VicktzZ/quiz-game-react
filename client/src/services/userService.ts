import type { User } from "@/types"
import { Service } from "./Service"

class UserService extends Service<User> {
    constructor() {
        super()
    }

    async signIn(user: User) {
        return await this.POST("/auth/sign-in", user)
    }

    async signUp(user: User) {
        return await this.POST("/auth/sign-up", user)
    }
}

export const userService = new UserService()
