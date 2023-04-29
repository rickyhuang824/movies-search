import SearchBar from "@/components/search-page/search-bar";
import { Flex } from "@chakra-ui/react";
import axios from "axios";
import React from "react";

const SearchPage: React.FC = () => {
    const submitHandler = async (name: string) => {
        const encodedName = encodeURIComponent(name.trim());

        try {
            const response = await axios.get(`/api/search?name=${encodedName}`);

            console.log(response.data);
        } catch (error) {
            console.log(error);
            return;
        }
    };

    return (
        <Flex direction="column" width="80%" mx="auto" mt={12}>
            <SearchBar searchHandler={submitHandler} />
        </Flex>
    );
};

export default SearchPage;
