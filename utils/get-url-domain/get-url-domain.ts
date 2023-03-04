export const getUrlDomain = (url: string) => {
    const urlSegments = url.split("/");

    if (urlSegments.length < 3) {
        return {
            success: false,
            error: "provide a valid url!!",
        };
    }

    return {
        success: true,
        data: {
            domain: urlSegments[2],
        },
    };
};
