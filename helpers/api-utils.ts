import { Bookmark } from "@/interfaces/movies";
import axios from "axios";

export const createUser = async (email: string, password: string) => {
    try {
        const response = await axios.post("/api/auth/signup", {
            email: email,
            password: password,
        });
        console.log(response);

        return response.data;
    } catch (error: any) {
        throw new Error(error.message || "Something went wrong");
    }
};

export const updateBookmarks = async (bookmark: Bookmark) => {
    try {
        const response = await axios.put("/api/bookmark", bookmark);
        console.log(response);
        return response.data;
    } catch (error: any) {
        throw new Error(error.message || "Something went wrong");
    }
};
