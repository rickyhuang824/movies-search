import React, { ReactNode } from "react";
import Navigation from "./navigation";

type Props = {
    children: ReactNode;
};

const Layout = (props: Props) => {
    return (
        <>
            <Navigation />
            <main>{props.children}</main>
        </>
    );
};

export default Layout;
