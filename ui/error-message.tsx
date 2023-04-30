import { useState } from "react";
import { Alert, AlertIcon, Box, CloseButton } from "@chakra-ui/react";
import { motion } from "framer-motion";

interface ErrorMessageProps {
    message: string;
}

const MotionBox = motion(Box);
const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {
        setIsVisible(false);
    };

    return (
        <>
            {isVisible && (
                <MotionBox
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    borderRadius="md"
                    mt={4}
                >
                    <Alert status="error" alignItems="center">
                        <AlertIcon />
                        {message}
                        <CloseButton
                            size="sm"
                            onClick={handleClose}
                            position="absolute"
                            right="8px"
                            top="8px"
                        />
                    </Alert>
                </MotionBox>
            )}
        </>
    );
};

export default ErrorMessage;
