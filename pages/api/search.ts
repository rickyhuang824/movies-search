import type { NextApiRequest, NextApiResponse } from "next";
import { getMoviesByNameRequestConfig } from "../../lib/movies-utils";
import axios from "axios";

interface MoviesSearchResult {
    Search: {
        Title: string | "";
        Year: string | "";
        imdbID: string | "";
        Type: string | "";
        Poster: string | "";
    }[];
    totalResults: string;
    Response: string;
}

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<MoviesSearchResult | { message: string }>
): Promise<void> => {
    if (req.method === "GET") {
        const name = req.query.name;

        if (typeof name !== "string") {
            res.status(422).json({ message: "Movie Name Cannot be Empty" });
            return;
        }

        const config = getMoviesByNameRequestConfig(name);

        try {
            const reponse = await axios.request(config);
            res.status(200).json(reponse.data);
        } catch (err: any) {
            res.status(500).json({
                message: err.message || "Something went wrong",
            });
        }
    }

    return;
};

export default handler;
