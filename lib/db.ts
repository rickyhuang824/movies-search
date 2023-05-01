import mongoose from "mongoose";

const connectMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log("Connected to MongoDB");
    } catch (error: any) {
        throw Error(error.message || "Error connecting to MongoDB");
    }
};

export default connectMongo;
