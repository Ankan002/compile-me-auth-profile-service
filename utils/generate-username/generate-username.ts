export const generateUsernameFromEmail = (email: string) =>
    email.split("@")[0] + "_gal";

export const generateUsernameFromGithub = (githubUsername: string) =>
    githubUsername + "_git";
