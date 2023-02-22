"use client";

import { useState } from "react";
import { BsGoogle, BsGithub } from "react-icons/bs";

interface Props {
    provider: "google" | "github";
}

const LoginBtn = (props: Props) => {
    const { provider } = props;

    const [isAuthenticating, setIsAutheticating] = useState<boolean>(false);

    const signInWithGoogle = async() => {

    }

    const signInWithGithub = async() => {

    }

    const signIn = () => {
        if(isAuthenticating) return;

        if(provider === "google") signInWithGoogle();
        else signInWithGithub();
    }

    return (
        <button className="p-2 border-2 border-primary-dark dark:border-primary-light bg-primary-yellow dark:bg-primary-orange mx-3 rounded-md select-none" aria-label={`${provider}-login-btn`} onClick={signIn}>
            {
                provider === "google" ? (
                    <BsGoogle className="text-primary-dark dark:text-primary-light text-3xl transition-none" />
                ) : (
                    <BsGithub className="text-primary-dark dark:text-primary-light text-3xl transition-none" />
                )
            }
        </button>
    )
};

export default LoginBtn;
