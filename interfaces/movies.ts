export interface Movie {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}

export interface MovieGridProps {
    movies: Movie[];
}

export type Bookmark = {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
};
