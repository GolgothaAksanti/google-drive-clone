/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            user_id?: string;
            name: string;
            email: string;
            image: string;
        };
    }

    interface User {
        id: string,
        user_id?: string
        name?: string | null
        email?: string | null
        image?: string | null
    }
}
