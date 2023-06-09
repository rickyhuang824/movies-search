import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../chakra/theme";
import Layout from "@/components/layout/layout";
import { SessionProvider } from "next-auth/react";
import BookmarkContextProvider from "@/store/bookmarks-context";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider theme={theme}>
            <SessionProvider session={pageProps.session}>
                <BookmarkContextProvider>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </BookmarkContextProvider>
            </SessionProvider>
        </ChakraProvider>
    );
}
