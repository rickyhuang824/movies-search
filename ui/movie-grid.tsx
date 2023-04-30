import { MovieGridProps, Movie } from "@/interfaces/movies";
import { Grid, GridItem } from "@chakra-ui/react";
import MovieCard from "./movie-card";

const MovieGrid = ({ movies }: MovieGridProps) => {
    return (
        <Grid
            templateColumns={{
                base: "repeat(1, 1fr)",
                md: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
                xl: "repeat(4, 1fr)",
            }}
            gap="4"
            my="8"
        >
            {movies.map((movie: Movie) => (
                <GridItem key={movie.imdbID}>
                    <MovieCard movie={movie} />
                </GridItem>
            ))}
        </Grid>
    );
};

export default MovieGrid;
