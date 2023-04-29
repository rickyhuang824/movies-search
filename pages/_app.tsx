import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../chakra/theme";
import Layout from "@/components/layout/layout";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider theme={theme}>
            <SessionProvider session={pageProps.session}>
                <Layout>
                    <Component {...pageProps} />;
                </Layout>
            </SessionProvider>
        </ChakraProvider>
    );
}
