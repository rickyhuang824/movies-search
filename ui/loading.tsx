import { Center, Spinner } from "@chakra-ui/react";
import { motion } from "framer-motion";

const Loading = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } },
        exit: { opacity: 0, transition: { duration: 0.5 } },
    };

    const spinnerVariants = {
        start: { rotate: 0 },
        end: { rotate: 360 },
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            width="100%"
            height="100%"
        >
            <Center height="60vh" width="100%">
                <Spinner
                    size="xl"
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="teal.500"
                    mr="4"
                    animate="end"
                    variants={spinnerVariants}
                />
                <motion.span
                    fontSize="2xl"
                    fontWeight="bold"
                    color="gray.600"
                    animate={{
                        y: [-3, 3],
                        transition: { repeat: Infinity, duration: 0.5 },
                    }}
                >
                    Loading...
                </motion.span>
            </Center>
        </motion.div>
    );
};

export default Loading;
