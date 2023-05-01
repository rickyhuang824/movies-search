import { getServerSession } from "next-auth";
import connectMongo from "@/lib/db";
import mongoose from "mongoose";
import { authOptions } from "../auth/[...nextauth]";

const Bookmark =
    mongoose.models.Bookmark || require("@/models/bookmark").default;

const handler = async (req, res) => {
    if (req.method === "DELETE") {
        console.log("here");
        const { imdbID } = req.query;

        if (!imdbID) {
            res.status(422).json({ message: "Invalid data" });
            return;
        }

        const session = await getServerSession(req, res, authOptions);

        if (!session) {
            res.status(401).json({ message: "Your are not authenticated" });
            return;
        }

        try {
            await connectMongo();
        } catch (err: any) {
            res.status(500).json({ message: err.message });
            return;
        }

        try {
            const userId = session.user.id;
            const result = await Bookmark.deleteOne({
                user: userId,
                imdbID: imdbID,
            });

            if (result.deletedCount === 0) {
                res.status(404).json({ message: "Bookmark not found" });
                return;
            }

            res.status(200).json({ message: "Bookmark deleted successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
};

export default handler;
