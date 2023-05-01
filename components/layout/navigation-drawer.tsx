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
import { signOut, useSession } from "next-auth/react";

interface NavigationDrawerProps {
    onClose: () => void;
    isOpen: boolean;
}

const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
    onClose,
    isOpen,
}) => {
    const { data: session, status } = useSession();

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
                            href="/search"
                            fontSize="lg"
                            onClick={onClose}
                            mb={4}
                            colorScheme="purple"
                        >
                            Search
                        </Button>
                        {session && status === "authenticated" ? (
                            <>
                                <Button
                                    as={NextLink}
                                    href="/bookmark"
                                    fontSize="lg"
                                    onClick={onClose}
                                    mb={4}
                                    colorScheme="purple"
                                >
                                    Bookmarks
                                </Button>
                                <Button
                                    colorScheme="purple"
                                    onClick={() => signOut()}
                                    fontSize="lg"
                                >
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    colorScheme="purple"
                                    as={NextLink}
                                    href="/signin"
                                    onClick={onClose}
                                    mb={4}
                                    fontSize="lg"
                                >
                                    Sign In
                                </Button>
                                <Button
                                    colorScheme="purple"
                                    as={NextLink}
                                    href="/signup"
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
