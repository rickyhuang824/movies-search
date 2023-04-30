import { Box, Text, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Movie } from "@/interfaces/movies";
// import Image from "next/image";

const MotionBox = motion(Box);

const MovieCard = ({ movie }: { movie: Movie }) => {
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
        </MotionBox>
    );
};

export default MovieCard;
