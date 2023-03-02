export const generateUsername = (
    email: string,
    provider: "google" | "github"
) =>
    provider === "google"
        ? email.split("@")[0] + "_gal"
        : email.split("@")[0] + "_git";
