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
import { getUrlDomain } from "utils";
import { login } from "helpers";

interface Props {
    provider: "google" | "github";
    authUrl: string | null;
}

const LoginBtn = (props: Props) => {
    const { provider, authUrl } = props;

    const [isAuthenticating, setIsAutheticating] = useState<boolean>(false);

    const signInWithGoogle = async (authDomain: string) => {
        setIsAutheticating(true);

        try {
            const firebaseApp = getFirebaseApp();
            const auth = getAuth(firebaseApp);
            const googleAuthProvider = getGoogleAuthProvider();

            const googleFirebaseResponse = await signInWithPopup(
                auth,
                googleAuthProvider
            );

            await signOut(auth);

            if (
                !googleFirebaseResponse.user.displayName ||
                !googleFirebaseResponse.providerId ||
                !googleFirebaseResponse.user.email ||
                !googleFirebaseResponse.user.photoURL ||
                googleFirebaseResponse.user.providerData.length < 1
            ) {
                setIsAutheticating(false);
                return;
            }

            const loginResponse = await login(authDomain, {
                name: googleFirebaseResponse.user.displayName,
                provider: "google",
                provider_id: googleFirebaseResponse.user.providerData[0].uid,
                email: googleFirebaseResponse.user.email,
                profile_pic: googleFirebaseResponse.user.photoURL,
            });

            console.log(loginResponse);

            setIsAutheticating(false);

            if(window !== undefined && authUrl) location.href = authUrl;
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

    const signInWithGithub = async (authDomain: string) => {
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

            await signOut(auth);

            if (
                !githubFirebaseUserInfo?.profile ||
                githubFirebaseResponse.user.providerData.length < 0 ||
                !githubFirebaseResponse.user.providerData[0].displayName ||
                !githubFirebaseResponse.user.providerData[0].email ||
                !githubFirebaseResponse.user.providerData[0].photoURL
            ) {
                setIsAutheticating(false);
                return;
            }

            const loginResponse = await login(authDomain, {
                name: githubFirebaseResponse.user.providerData[0].displayName,
                provider: "github",
                provider_id: githubFirebaseResponse.user.providerData[0].uid,
                email: githubFirebaseResponse.user.providerData[0].email,
                profile_pic:
                    githubFirebaseResponse.user.providerData[0].photoURL,
                github_username: githubFirebaseUserInfo.username ?? "",
                github_profile_url: githubFirebaseUserInfo.profile
                    .html_url as string,
            });

            console.log(loginResponse);

            setIsAutheticating(false);

            if(window !== undefined && authUrl) location.href = authUrl;
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

        if (!authUrl) {
            console.log("Give a valid URL to authenticate...");
            return;
        }

        const domainResponse = getUrlDomain(authUrl);

        if (!domainResponse.success || !domainResponse.data) {
            console.log(domainResponse.error);
            return;
        }

        if (provider === "google") signInWithGoogle(domainResponse.data.domain);
        else signInWithGithub(domainResponse.data.domain);
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
