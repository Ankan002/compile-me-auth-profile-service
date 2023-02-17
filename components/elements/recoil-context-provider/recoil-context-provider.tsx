"use client";

import { ReactNode } from "react";
import { RecoilRoot } from "recoil";

interface Props {
    children: ReactNode;
}

const RecoilContextProvider = (props: Props) => {
    const { children } = props;

    return <RecoilRoot>{children}</RecoilRoot>;
};

export default RecoilContextProvider;
