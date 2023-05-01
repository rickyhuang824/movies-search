import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongo from "../../../lib/db";
import { verifyPassword } from "../../../lib/auth";
import User from "@/models/user";
import mongoose from "mongoose";

interface Credentials {
    email: string;
    password: string;
}

const Bookmark =
    mongoose.models.Bookmark || require("@/models/bookmark").default;

export const authOptions: AuthOptions = {
    session: { strategy: "jwt" },
    providers: [
        CredentialsProvider({
            async authorize(credentials: Credentials) {
                await connectMongo();
                const user = await User.findOne({ email: credentials.email });

                if (!user) {
                    throw new Error("No User found");
                }

                const isValid = await verifyPassword(
                    credentials.password,
                    user.password
                );

                if (!isValid) {
                    throw new Error("Invalid password");
                }

                const bookmarks = await Bookmark.find({ user: user._id });
                user.bookmarks = bookmarks;
                console.log(user);

                return user;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.userId = user._id;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.userId;
            session.user.name = "";
            session.user.image = "";
            return session;
        },
    },
};

export default NextAuth(authOptions);
