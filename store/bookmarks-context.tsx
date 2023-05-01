import axios from "axios";
import { createContext, useEffect, useRef, useState } from "react";
import { Movie } from "@/interfaces/movies";
import { useSession } from "next-auth/react";

type BookmarksContextType = {
    bookmarks: Movie[];
    addBookmark: (bookmark: Movie) => void;
    removeBookmark: (bookmark: Movie) => void;
};

export const BookmarksContext = createContext<BookmarksContextType>({
    bookmarks: [],
    addBookmark: () => {},
    removeBookmark: () => {},
});

const BookmarkContextProvider = (props: React.PropsWithChildren<{}>) => {
    const [currentBookmarks, setCurrentBookmarks] = useState<Movie[]>([]);
    const updatingRef = useRef<boolean>(false);
    const removingRef = useRef<string>("");

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
            const updateBookmarks = async (bookmark: Movie) => {
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

        if (removingRef.current) {
            const removeBookmark = async (imdbID: string) => {
                try {
                    const response = await axios.delete(
                        `/api/bookmark/${imdbID}`
                    );

                    console.log(response);
                } catch (error: any) {
                    console.log(error);
                }
                removingRef.current = "";
            };
            removeBookmark(removingRef.current);
        }
    }, [currentBookmarks]);

    const addBookmark = (bookmark: Movie) => {
        updatingRef.current = true;
        setCurrentBookmarks((previousBookmarks) => [
            ...previousBookmarks,
            bookmark,
        ]);
    };

    const removeBookmark = (bookmarkMovieToRemove: Movie) => {
        removingRef.current = bookmarkMovieToRemove.imdbID;
        setCurrentBookmarks((previousBookmarks) =>
            previousBookmarks.filter(
                (movie) => movie.imdbID !== bookmarkMovieToRemove.imdbID
            )
        );
    };

    return (
        <BookmarksContext.Provider
            value={{ bookmarks: currentBookmarks, addBookmark, removeBookmark }}
        >
            {props.children}
        </BookmarksContext.Provider>
    );
};

export default BookmarkContextProvider;
