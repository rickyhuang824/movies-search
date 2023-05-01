import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import connectMongo from "@/lib/db";
import mongoose from "mongoose";

const Bookmark =
    mongoose.models.Bookmark || require("@/models/bookmark").default;

const handler = async (req, res) => {
    if (req.method === "PUT") {
        const { Title, Year, imdbID, Type, Poster } = req.body;
        if (!Title || !Year || !imdbID || !Type || !Poster) {
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
            const bookmark = new Bookmark({
                user: session.user.id, // add the user id to the new bookmark
                Title,
                Year,
                imdbID,
                Type,
                Poster,
            });

            const newBookmark = await bookmark.save(); // save the new bookmark to the database

            res.status(200).json({ bookmark: newBookmark });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    if (req.method === "GET") {
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
            const bookmarks = await Bookmark.find({ user: userId });
            res.status(200).json({ bookmarks });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
};

export default handler;
