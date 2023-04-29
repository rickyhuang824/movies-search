interface ApiConfig {
    method: "GET";
    url: string;
    params: Record<string, string>;
    headers: Record<string, string>;
}

const getMoviesByNameRequestConfig = (name: string): ApiConfig => {
    const config: ApiConfig = {
        method: "GET",
        url: `${process.env.RAPIDAPI_MOVIES_URL}`,
        params: {
            s: `${name}`,
            r: "json",
        },
        headers: {
            "content-type": "application/octet-stream",
            "X-RapidAPI-Key": `${process.env.X_RAPIDAPI_KEY}`,
            "X-RapidAPI-Host": `${process.env.X_RapidAPI_Host}`,
        },
    };

    return config;
};

export { getMoviesByNameRequestConfig };
