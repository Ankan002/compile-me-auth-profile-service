"use client";

import { getGoogleAuthProvider } from "config/get-google-auth-provider";
import { getFirebaseApp } from "config/get-firebase-app";
import {
    getAuth,
    signInWithPopup,
    getAdditionalUserInfo,
    signOut,
} from "firebase/auth";
import { useState } from "react";
import { BsGoogle, BsGithub } from "react-icons/bs";
import { getGithubAuthProvider } from "config/get-github-auth-provider";

interface Props {
    provider: "google" | "github";
}

const LoginBtn = (props: Props) => {
    const { provider } = props;

    const [isAuthenticating, setIsAutheticating] = useState<boolean>(false);

    const signInWithGoogle = async () => {
        setIsAutheticating(true);

        try {
            const firebaseApp = getFirebaseApp();
            const auth = getAuth(firebaseApp);
            const googleAuthProvider = getGoogleAuthProvider();

            const googleFirebaseResponse = await signInWithPopup(
                auth,
                googleAuthProvider
            );
            const googleFirebaseUserInfo = getAdditionalUserInfo(
                googleFirebaseResponse
            );

            console.log(googleFirebaseUserInfo);

            await signOut(auth);

            setIsAutheticating(false);
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
                setIsAutheticating(false);
                return;
            }

            console.log(error);
            setIsAutheticating(false);
        }
    };

    const signInWithGithub = async () => {
        setIsAutheticating(true);

        try {
            const firebaseApp = getFirebaseApp();
            const auth = getAuth(firebaseApp);
            const githubAuthProvider = getGithubAuthProvider();

            const githubFirebaseResponse = await signInWithPopup(
                auth,
                githubAuthProvider
            );
            const githubFirebaseUserInfo = getAdditionalUserInfo(
                githubFirebaseResponse
            );

            console.log(githubFirebaseUserInfo);

            await signOut(auth);

            setIsAutheticating(false);
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
                setIsAutheticating(false);
                return;
            }

            console.log(error);
            setIsAutheticating(false);
        }
    };

    const signIn = () => {
        if (isAuthenticating) return;

        if (provider === "google") signInWithGoogle();
        else signInWithGithub();
    };

    return (
        <button
            className="p-2 border-2 border-primary-dark dark:border-primary-light bg-primary-yellow dark:bg-primary-orange mx-3 rounded-md select-none"
            aria-label={`${provider}-login-btn`}
            onClick={signIn}
        >
            {provider === "google" ? (
                <BsGoogle className="text-primary-dark dark:text-primary-light text-3xl transition-none" />
            ) : (
                <BsGithub className="text-primary-dark dark:text-primary-light text-3xl transition-none" />
            )}
        </button>
    );
};

export default LoginBtn;
