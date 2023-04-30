import { Movie } from "@/interfaces/movies";
import ErrorMessage from "@/ui/error-message";
import Loading from "@/ui/loading";
import MovieGrid from "@/ui/movie-grid";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const MovieList = ({ encodedName }: { encodedName: string }) => {
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

    return <>{movies && <MovieGrid movies={movies} />}</>;
};

export default MovieList;
