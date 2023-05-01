import { hashPassword } from "@/lib/auth";
import connectMongo from "@/lib/db";
import User, { UserDocument } from "@/models/user";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const { email, password } = req.body;

        if (
            !email ||
            !email.includes("@") ||
            !password ||
            password.trim().length < 7
        ) {
            res.status(422).json({ message: "Invalid email or password" });
            return;
        }

        try {
            await connectMongo();
        } catch (err: any) {
            res.status(500).json({ message: err.message });
            return;
        }

        try {
            const existingUsers = await User.findOne({ email });
            if (existingUsers) {
                res.status(422).json({ message: "User already exists" });
                return;
            }
            const hashedPassword = await hashPassword(password);
            const newUser: UserDocument = new User({
                email,
                password: hashedPassword,
            });
            await newUser.save();
            res.status(201).json({ message: "Created User!" });
            return;
        } catch (err: any) {
            res.status(500).json({ message: err.message });
            return;
        }
    }

    return;
};

export default handler;
