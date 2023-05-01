export interface Movie {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
    isBookmarked?: boolean;
    _id?: string;
}

export interface MovieGridProps {
    movies: Movie[];
    handleBookmarkClick: (movie: Movie) => void;
}

export type Bookmark = {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
};
