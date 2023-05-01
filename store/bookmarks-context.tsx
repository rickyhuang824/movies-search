import axios from "axios";
import { createContext, useEffect, useRef, useState } from "react";
import { Bookmark } from "@/interfaces/movies";
import { useSession } from "next-auth/react";

type BookmarksContextType = {
    bookmarks: Bookmark[];
    addBookmark: (bookmark: Bookmark) => void;
};

export const BookmarksContext = createContext<BookmarksContextType>({
    bookmarks: [],
    addBookmark: () => {},
});

const BookmarkContextProvider = (props: React.PropsWithChildren<{}>) => {
    const [currentBookmarks, setCurrentBookmarks] = useState<Bookmark[]>([]);
    const updatingRef = useRef<boolean>(false);
    const { data: session, status } = useSession();

    useEffect(() => {
        const fetchBookmarks = async () => {
            try {
                const response = await axios.get("/api/bookmark");
                setCurrentBookmarks(response.data.bookmarks);
            } catch (error: any) {
                console.log(error);
            }
        };

        session && status === "authenticated" && fetchBookmarks();
    }, [session, status]);

    useEffect(() => {
        if (updatingRef.current) {
            console.log(currentBookmarks);
            const updateBookmarks = async (bookmark: Bookmark) => {
                try {
                    const response = await axios.put("/api/bookmark", bookmark);
                    console.log(response);
                } catch (error: any) {
                    console.log(error);
                }
                updatingRef.current = false;
            };
            updateBookmarks(currentBookmarks[currentBookmarks.length - 1]);
        }
    }, [currentBookmarks]);

    const addBookmark = (bookmark: Bookmark) => {
        updatingRef.current = true;
        setCurrentBookmarks((previousBookmarks) => [
            ...previousBookmarks,
            bookmark,
        ]);
    };

    return (
        <BookmarksContext.Provider
            value={{ bookmarks: currentBookmarks, addBookmark }}
        >
            {props.children}
        </BookmarksContext.Provider>
    );
};

export default BookmarkContextProvider;
