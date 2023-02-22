import { GoogleAuthProvider } from "firebase/auth";

let googleAuthProvider: GoogleAuthProvider;

export const getGoogleAuthProvider = () => {
    if(googleAuthProvider) return googleAuthProvider;

    googleAuthProvider = new GoogleAuthProvider();

    return googleAuthProvider;
};
