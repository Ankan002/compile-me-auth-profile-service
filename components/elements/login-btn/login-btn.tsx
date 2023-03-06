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
import { toast } from "react-hot-toast";

interface Props {
    provider: "google" | "github";
    authUrl: string | null;
}

const LoginBtn = (props: Props) => {
    const { provider, authUrl } = props;

    const [isAuthenticating, setIsAutheticating] = useState<boolean>(false);

    const signInWithGoogle = async (authDomain: string) => {
        const loadingToastId = toast.loading("Signin In...");
        setIsAutheticating(true);

        try {
            const firebaseApp = getFirebaseApp();
            const auth = getAuth(firebaseApp);
            const googleAuthProvider = getGoogleAuthProvider();
            googleAuthProvider.addScope("email");

            const googleFirebaseResponse = await signInWithPopup(
                auth,
                googleAuthProvider
            );

            console.log(googleFirebaseResponse);

            await signOut(auth);

            if (
                !googleFirebaseResponse.user.displayName ||
                !googleFirebaseResponse.providerId ||
                !googleFirebaseResponse.user.photoURL ||
                googleFirebaseResponse.user.providerData.length < 1
            ) {
                toast.dismiss(loadingToastId);
                toast.error("Login Failed... Valid login data not available, please contact support...");
                setIsAutheticating(false);
                return;
            }

            const loginResponse = await login(authDomain, {
                name: googleFirebaseResponse.user.displayName,
                provider: "google",
                provider_id: googleFirebaseResponse.user.providerData[0].uid,
                email: googleFirebaseResponse.user.providerData[0].email ?? "",
                profile_pic: googleFirebaseResponse.user.photoURL,
            });

            console.log(loginResponse);

            toast.dismiss(loadingToastId);
            setIsAutheticating(false);

            if(!loginResponse.success) {
                toast.error(loginResponse.error);
                return;
            }

            toast.success("Login Successful!!");

            // if(window !== undefined && authUrl) location.href = authUrl;
        } catch (error) {
            toast.dismiss(loadingToastId);

            if (error instanceof Error) {
                toast.error(error.message);
                setIsAutheticating(false);
                return;
            }

            toast.error("Internal Server Error!!");
            setIsAutheticating(false);
        }
    };

    const signInWithGithub = async (authDomain: string) => {
        const loadingToastId = toast.loading("Signin In...");
        setIsAutheticating(true);

        try {
            const firebaseApp = getFirebaseApp();
            const auth = getAuth(firebaseApp);
            const githubAuthProvider = getGithubAuthProvider();
            githubAuthProvider.addScope("email");

            const githubFirebaseResponse = await signInWithPopup(
                auth,
                githubAuthProvider
            );
            const githubFirebaseUserInfo = getAdditionalUserInfo(
                githubFirebaseResponse
            );

            console.log(githubFirebaseResponse);
            console.log(githubFirebaseUserInfo);

            await signOut(auth);

            if (
                !githubFirebaseUserInfo?.profile ||
                githubFirebaseResponse.user.providerData.length < 0 ||
                !githubFirebaseResponse.user.providerData[0].displayName ||
                !githubFirebaseResponse.user.providerData[0].photoURL
            ) {
                toast.dismiss(loadingToastId);
                toast.error("Login Failed... Valid login data not available, please contact support...");
                setIsAutheticating(false);
                return;
            }

            const loginResponse = await login(authDomain, {
                name: githubFirebaseResponse.user.providerData[0].displayName,
                provider: "github",
                provider_id: githubFirebaseResponse.user.providerData[0].uid,
                email: githubFirebaseResponse.user.providerData[0].email ?? undefined,
                profile_pic:
                    githubFirebaseResponse.user.providerData[0].photoURL,
                github_username: githubFirebaseUserInfo.username ?? "",
                github_profile_url: githubFirebaseUserInfo.profile
                    .html_url as string,
            });

            console.log(loginResponse);

            toast.dismiss(loadingToastId);
            setIsAutheticating(false);

            if(!loginResponse.success) {
                toast.error(loginResponse.error);
                return;
            }

            toast.success("Login Successful!!");

            // if(window !== undefined && authUrl) location.href = authUrl;
        } catch (error) {
            toast.dismiss(loadingToastId);

            if (error instanceof Error) {
                toast.error(error.message);
                setIsAutheticating(false);
                return;
            }

            toast.error("Internal Server Error!!");
            setIsAutheticating(false);
        }
    };

    const signIn = () => {
        if (isAuthenticating) return;

        if (!authUrl) {
            toast.error("Give a valid URL to authenticate...");
            return;
        }

        const domainResponse = getUrlDomain(authUrl);

        if (!domainResponse.success || !domainResponse.data) {
            toast.error(domainResponse.error ?? "Internal Server Error!!");
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
