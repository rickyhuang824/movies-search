import MovieList from "@/components/search-page/movies-list";
import SearchBar from "@/components/search-page/search-bar";
import ErrorMessage from "@/ui/error-message";
import { Flex } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";

const SearchPage: React.FC = () => {
    const [encodedName, setEncodedName] = useState("");

    const submitHandler = async (name: string) => {
        const encodedName = encodeURIComponent(name.trim());
        setEncodedName(encodedName);
    };

    return (
        <Flex direction="column" width="80%" mx="auto" mt={12}>
            <SearchBar searchHandler={submitHandler} />
            {encodedName && <MovieList encodedName={encodedName} />}
        </Flex>
    );
};

export default SearchPage;
