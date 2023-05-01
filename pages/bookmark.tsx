import React from "react";
import AuthForm from "@/components/auth/auth-form";
import { authOptions } from "./api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";

const BookmarkPage = () => {
    const { data: session } = useSession();

    if (!session) {
        return <div>You need to sign in to access this page</div>;
    }
    console.log(session);

    const { user } = session;

    return <div></div>;
};

export const getServerSideProps = async (context) => {
    const session = await getServerSession(
        context.req,
        context.res,
        authOptions
    );

    if (!session) {
        return {
            redirect: {
                destination: "/signin",
                permanent: false,
            },
        };
    }

    return {
        props: {
            session,
        },
    };
};

export default BookmarkPage;
