"use client";

import { useEffect } from "react";

interface Props {
    redirectUrl: string;
}

const Redirect = (props: Props) => {
    const { redirectUrl } = props;

    useEffect(() => {
        if (window !== undefined && redirectUrl) {
            window.location.href = redirectUrl;
        }
    }, [redirectUrl]);

    return <></>;
};

export default Redirect;
