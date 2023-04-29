import { Formik } from "formik";
import {
    Input,
    Flex,
    IconButton,
    Box,
    InputLeftElement,
    InputGroup,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";

interface SearchBarProps {
    searchHandler: (name: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchHandler }) => {
    return (
        <Formik
            initialValues={{ name: "" }}
            onSubmit={(values) => {
                searchHandler(values.name);
            }}
            validate={(values) => {
                const errors: { name?: string } = {};
                if (!values.name) {
                    errors.name = "Movie name cannot be empty";
                }
                return errors;
            }}
        >
            {(formik) => (
                <form onSubmit={formik.handleSubmit}>
                    <Flex justify="space-between">
                        <InputGroup>
                            <InputLeftElement pointerEvents="none">
                                <SearchIcon color="secondary.300" />
                            </InputLeftElement>
                            <Input
                                type="text"
                                placeholder="Search By Movie Name"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                bg="white"
                                borderRadius="md"
                                border="2px"
                                borderColor={
                                    formik.touched.name && formik.errors.name
                                        ? "red.500"
                                        : "gray.300"
                                }
                                shadow="sm"
                                _hover={{ borderColor: "gray.500" }}
                                _focus={{
                                    outline: "none",
                                    borderColor: "purple.500",
                                }}
                            />
                        </InputGroup>
                        <motion.div whileHover={{ scale: 1.2 }}>
                            <IconButton
                                aria-label="Search"
                                type="submit"
                                icon={<SearchIcon />}
                                colorScheme="purple"
                                size="md"
                                ml={4}
                            />
                        </motion.div>
                    </Flex>
                    {formik.touched.name && formik.errors.name ? (
                        <Box mt={1} color="red.300">
                            {formik.errors.name}
                        </Box>
                    ) : null}
                </form>
            )}
        </Formik>
    );
};

export default SearchBar;
