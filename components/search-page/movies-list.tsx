import { Movie } from "@/interfaces/movies";
import { BookmarksContext } from "@/store/bookmarks-context";
import ErrorMessage from "@/ui/error-message";
import Loading from "@/ui/loading";
import MovieGrid from "@/ui/movie-grid";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useContext } from "react";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const MovieList = ({ encodedName }: { encodedName: string }) => {
    const { data: session } = useSession();
    const router = useRouter();

    const { bookmarks, addBookmark, removeBookmark } =
        useContext(BookmarksContext);

    const isBookmarked = (movie: Movie) =>
        bookmarks.some((b) => b.imdbID === movie.imdbID);

    const { data, error, isLoading } = useSWR(
        `/api/search?name=${encodedName}`,
        fetcher,
        { revalidateOnFocus: false }
    );

    if (error) return <ErrorMessage message="Fail to load, please try later" />;
    if (isLoading) return <Loading />;

    if (data.Response === "False") {
        return <ErrorMessage message={data.Error} />;
    }

    const movies = data.Search;

    const handleBookmarkClick = (movie: Movie) => {
        if (!session) {
            router.replace("/signin");
        } else {
            if (movie.isBookmarked) {
                removeBookmark(movie);
            } else {
                addBookmark(movie);
            }
        }
    };

    return (
        <>
            {movies && (
                <MovieGrid
                    movies={movies.map((movie: Movie) => ({
                        ...movie,
                        isBookmarked: isBookmarked(movie),
                    }))}
                    handleBookmarkClick={handleBookmarkClick}
                />
            )}
        </>
    );
};

export default MovieList;
