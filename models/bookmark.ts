import mongoose, { Document, Model, PopulatedDoc, Schema } from "mongoose";
import { UserDocument } from "./user";

export interface BookmarkDocument extends Document {
    user: PopulatedDoc<UserDocument>;
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}

const bookmarkSchema: Schema<BookmarkDocument> = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    Title: { type: String, required: true },
    Year: { type: String, required: true },
    imdbID: { type: String, required: true },
    Type: { type: String, required: true },
    Poster: { type: String, required: true },
});

const Bookmark: Model<BookmarkDocument> = mongoose.model<BookmarkDocument>(
    "Bookmark",
    bookmarkSchema
);

export default Bookmark;
