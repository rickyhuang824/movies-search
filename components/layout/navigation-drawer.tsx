import {
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerOverlay,
    Flex,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { signOut } from "next-auth/react";

interface NavigationDrawerProps {
    onClose: () => void;
    isOpen: boolean;
}

const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
    onClose,
    isOpen,
}) => {
    return (
        <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerBody>
                    <Flex direction="column" mt="12">
                        <Button
                            as={NextLink}
                            href="/"
                            fontSize="lg"
                            onClick={onClose}
                            mb={4}
                            colorScheme="purple"
                        >
                            Home
                        </Button>
                        <Button
                            as={NextLink}
                            href="/"
                            fontSize="lg"
                            onClick={onClose}
                            mb={4}
                            colorScheme="purple"
                        >
                            Search
                        </Button>
                        <Button
                            as={NextLink}
                            href="/"
                            fontSize="lg"
                            onClick={onClose}
                            mb={4}
                            colorScheme="purple"
                        >
                            Bookmarks
                        </Button>
                        {false ? (
                            <Button
                                colorScheme="purple"
                                onClick={() => signOut()}
                                mr={4}
                            >
                                Logout
                            </Button>
                        ) : (
                            <>
                                <Button
                                    colorScheme="purple"
                                    as={NextLink}
                                    href="/"
                                    onClick={onClose}
                                    mb={4}
                                    fontSize="lg"
                                >
                                    Sign In
                                </Button>
                                <Button
                                    colorScheme="purple"
                                    as={NextLink}
                                    href="/"
                                    onClick={onClose}
                                    mb={4}
                                    fontSize="lg"
                                >
                                    Sign Up
                                </Button>
                            </>
                        )}
                    </Flex>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
};

export default NavigationDrawer;
