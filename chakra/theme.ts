import { extendTheme } from "@chakra-ui/react";
import { Open_Sans } from "next/font/google";

const nextFont = Open_Sans({ weight: ["400"], subsets: ["latin"] });

export const theme = extendTheme({
    colors: {
        primary: {
            50: "#E3F2F9",
            100: "#C5E4F3",
            200: "#A2D4EC",
            300: "#7AC1E4",
            400: "#47A9DA",
            500: "#0088CC",
            600: "#007AB8",
            700: "#006BA1",
            800: "#005885",
            900: "#003F5E",
        },
        secondary: {
            50: "#FEEAE6",
            100: "#FED7CC",
            200: "#FDBA9B",
            300: "#FF8A4C",
            400: "#FF5E1F",
            500: "#D73B01",
            600: "#AD2E01",
            700: "#832101",
            800: "#4F1302",
            900: "#1A0402",
        },
    },
    fonts: {
        body: nextFont.style.fontFamily,
        heading: nextFont.style.fontFamily,
    },
    fontSizes: {
        xs: "12px",
        sm: "14px",
        md: "16px",
        lg: "20px",
        xl: "24px",
        "2xl": "32px",
        "3xl": "40px",
        "4xl": "48px",
        "5xl": "56px",
        "6xl": "64px",
    },
    fontWeights: {
        normal: 400,
        medium: 500,
        bold: 700,
    },
    lineHeights: {
        normal: "normal",
        none: 1,
        shorter: 1.25,
        short: 1.375,
        base: 1.5,
        tall: 1.625,
        taller: "2",
    },
    styles: {
        global: {
            a: {
                color: "blue.500",
                textDecoration: "none",
                transition: "color 0.3s ease",
                _hover: {
                    color: "purple.500",
                },
            },
        },
    },
    components: {
        Link: {
            baseStyle: {
                color: "teal",
            },
        },
        Button: {
            baseStyle: {},
        },
        // Input, // not working for some reason - come back to this
    },
});
