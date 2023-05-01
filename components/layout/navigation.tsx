import {
    Box,
    Button,
    Flex,
    IconButton,
    Link,
    useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import { useSession, signOut } from "next-auth/react";
import { BiCameraMovie } from "react-icons/bi";
import NavigationDrawer from "./navigation-drawer";
import SpinnerDiv from "@/ui/spinner-div";

const Navbar = () => {
    const { data: session, status } = useSession();
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            padding="1.5rem"
            bg="primary.50"
        >
            <Flex
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                flexGrow={{ base: "4", md: "1" }}
            >
                <NextLink href="/">
                    <SpinnerDiv>
                        <BiCameraMovie size={40} color="purple" />
                    </SpinnerDiv>
                </NextLink>
            </Flex>

            <Box display={{ base: "block", md: "none" }}>
                <IconButton
                    icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                    onClick={isOpen ? onClose : onOpen}
                    aria-label="Toggle navigation"
                    size="md"
                    bg="purple.400"
                />
            </Box>

            <Flex
                display={{ base: "none", md: "flex" }}
                flexGrow={4}
                align="center"
                justify="space-between"
            >
                <Flex
                    display={{ base: "none", md: "flex" }}
                    width={{ base: "full", md: "auto" }}
                    alignItems="center"
                    justify="space-around"
                    flex="3"
                >
                    <Link as={NextLink} mx={2} href={"/"} fontWeight="bold">
                        Home
                    </Link>
                    <Link
                        as={NextLink}
                        mx={2}
                        href={"/search"}
                        fontWeight="bold"
                    >
                        Search
                    </Link>
                    {session && (
                        <Link
                            as={NextLink}
                            mx={2}
                            href={"/bookmark"}
                            fontWeight="bold"
                        >
                            Bookmark
                        </Link>
                    )}
                </Flex>

                <Flex
                    display={{ base: "none", md: "flex" }}
                    mt={{ base: 4, md: 0 }}
                    flex="2"
                    justify="end"
                >
                    {session && status === "authenticated" ? (
                        <Button
                            onClick={() => signOut()}
                            mr={4}
                            colorScheme="purple"
                        >
                            Logout
                        </Button>
                    ) : (
                        <>
                            <Button
                                colorScheme="teal"
                                variant="outline"
                                as={NextLink}
                                mr={4}
                                href={"/signin"}
                            >
                                Sign In
                            </Button>
                            <Button
                                colorScheme="purple"
                                as={NextLink}
                                href={"/signup"}
                            >
                                Sign Up
                            </Button>
                        </>
                    )}
                </Flex>
            </Flex>

            <NavigationDrawer onClose={onClose} isOpen={isOpen} />
        </Flex>
    );
};

export default Navbar;
