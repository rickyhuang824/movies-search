import React from "react";
import AuthForm from "@/components/auth/auth-form";
import { authOptions } from "./api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

const SigninPage = () => {
    return <AuthForm isSignIn={true} />;
};

export const getServerSideProps = async (context) => {
    const session = await getServerSession(
        context.req,
        context.res,
        authOptions
    );

    if (session) {
        return {
            redirect: {
                destination: "/search",
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
};

export default SigninPage;
