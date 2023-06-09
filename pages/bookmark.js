import React, { useContext } from "react";
import { authOptions } from "./api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { BookmarksContext } from "@/store/bookmarks-context";
import { Flex } from "@chakra-ui/react";
import BookmarkList from "@/components/bookmarks-page/bookmark-list";

const BookmarkPage = () => {
    const { bookmarks, removeBookmark } = useContext(BookmarksContext);
    const bookmarksMoviesWithFlag = bookmarks.map((bookmarkMovie) => ({
        ...bookmarkMovie,
        isBookmarked: true,
    }));

    const handleBookmarkClick = (movie) => {
        removeBookmark(movie);
    };

    return (
        <Flex width="80%" justify="center" mx="auto" mt={12}>
            {bookmarksMoviesWithFlag.length > 0 ? (
                <BookmarkList
                    bookmarksMovies={bookmarksMoviesWithFlag}
                    handleBookmarkClick={handleBookmarkClick}
                />
            ) : (
                <div>You have no bookmarked movies! Go add some</div>
            )}
        </Flex>
    );
};

export const getServerSideProps = async (context) => {
    const session = await getServerSession(
        context.req,
        context.res,
        authOptions
    );

    if (!session) {
        return {
            redirect: {
                destination: "/signin",
                permanent: false,
            },
        };
    }

    return {
        props: {
            session,
        },
    };
};

export default BookmarkPage;
