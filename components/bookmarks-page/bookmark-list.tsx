import { Movie } from "@/interfaces/movies";
import MovieGrid from "@/ui/movie-grid";
import { Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { motion } from "framer-motion";

interface BookmarkListProps {
    bookmarksMovies: Movie[];
    handleBookmarkClick: (movie: Movie) => void;
}

const MotionHeading = motion(Heading);
const BookmarkList = ({
    bookmarksMovies,
    handleBookmarkClick,
}: BookmarkListProps) => {
    console.log(bookmarksMovies);
    return (
        <Flex direction="column" alignItems="center">
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <MotionHeading
                    size="xl"
                    textAlign="center"
                    mb={4}
                    color="secondary.800"
                    animate={{ color: ["#805ad5", "#38b2ac", "#f6ad55"] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                >
                    Your Favorite Movies
                </MotionHeading>
            </motion.div>
            <MovieGrid
                movies={bookmarksMovies}
                handleBookmarkClick={handleBookmarkClick}
            />
        </Flex>
    );
};

export default BookmarkList;
