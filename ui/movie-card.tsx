import {
    Box,
    Text,
    Image,
    IconButton,
    Button,
    Icon,
    Flex,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Movie } from "@/interfaces/movies";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useContext } from "react";
import { BookmarksContext } from "@/store/bookmarks-context";

const MotionBox = motion(Box);

const MovieCard = ({ movie }: { movie: Movie }) => {
    const bookmarksCtx = useContext(BookmarksContext);
    return (
        <MotionBox
            p="4"
            boxShadow="md"
            borderRadius="md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            bg="secondary.400"
        >
            <Image src={movie.Poster} alt={movie.Title} objectFit="cover" />
            <Text fontWeight="bold" mt="2" fontSize="lg">
                {movie.Title}
            </Text>
            <Text fontSize="md" color="gray.800">
                year: {movie.Year}
            </Text>
            <Text fontSize="md" color="gray.800">
                type: {movie.Type}
            </Text>
            <Flex justify="end">
                <Button
                    size="md"
                    variant="ghost"
                    colorScheme="black"
                    aria-label="Bookmark"
                    onClick={() => {
                        bookmarksCtx.addBookmark(movie);
                    }}
                    _hover={{ bg: "primary.300" }}
                    _active={{ bg: "blue.700" }}
                >
                    <Icon
                        as={true ? BsHeartFill : BsHeart}
                        color={true ? "red.500" : "currentColor"}
                        mr="1"
                    />
                    Bookmark
                </Button>
            </Flex>
        </MotionBox>
    );
};

export default MovieCard;
