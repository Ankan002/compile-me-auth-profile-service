import { GithubAuthProvider } from "firebase/auth";

let githubAuthProvider: GithubAuthProvider;

export const getGithubAuthProvider = () => {
    if(githubAuthProvider) return githubAuthProvider;

    githubAuthProvider = new GithubAuthProvider();

    return githubAuthProvider;
};
