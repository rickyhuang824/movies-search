import mongoose, { Document, model, models, Schema } from "mongoose";

export interface User {
    email: string;
    password: string;
    bookmarks: [];
}

export interface UserDocument extends User, Document {}

const UserSchema = new Schema<UserDocument>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bookmarks: [{ type: Schema.Types.ObjectId, ref: "Bookmark" }],
});

export default (models.User as mongoose.Model<UserDocument>) ||
    model<UserDocument>("User", UserSchema);
