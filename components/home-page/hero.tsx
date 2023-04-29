import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import React from "react";
import { BsSearchHeart } from "react-icons/bs";

interface HeroProps {
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
    children: React.ReactNode;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, ctaText, ctaLink }) => {
    return (
        <Flex
            alignItems={{ base: "start", md: "center" }}
            height="100vh"
            bg="transparent"
            direction="row"
            background={{ base: "transparent", md: "primary.100" }}
        >
            <Box
                display={{ base: "none", md: "block" }}
                flex="3"
                h="100%"
                pos="relative"
            >
                <Image
                    src="/images/home-page/hero.jpg"
                    style={{ objectFit: "cover" }}
                    alt="hero"
                    fill={true}
                />
            </Box>
            <Box
                display={{ base: "block", md: "none" }}
                h="100%"
                pos="absolute"
                zIndex="-1"
                w="100%"
            >
                <Image
                    src="/images/home-page/hero.jpg"
                    style={{ objectFit: "cover" }}
                    alt="hero"
                    fill={true}
                />
            </Box>
            <Flex
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                flex="2"
                color={{ base: "primary.50", md: "teal.600" }}
            >
                <Box textAlign="left" p={6}>
                    <Heading as="h1" fontSize="6xl" mb={6}>
                        {title}
                    </Heading>
                    <Text
                        display={{ base: "none", md: "block" }}
                        fontSize="2xl"
                        mb={8}
                    >
                        {subtitle}
                    </Text>
                    <Button
                        as={NextLink}
                        href={ctaLink}
                        colorScheme="purple"
                        size="lg"
                        leftIcon={<BsSearchHeart />}
                    >
                        {ctaText}
                    </Button>
                </Box>
            </Flex>
        </Flex>
    );
};

export default Hero;
