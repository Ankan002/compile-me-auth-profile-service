import jwt from "jsonwebtoken";

export const decodeAuthUrl = (encodedAuthUrl: string) => {
    console.log(process.env["AUTH_URL_QUERY_JWT_SECRET"])

    try {
        const sec = process.env.NODE_ENV === "production" ? process.env.AUTH_URL_QUERY_JWT_SECRET as string : "dev_url_secret";

        const data = jwt.verify(
            encodedAuthUrl,
            sec
        );

        console.log(data);
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            return;
        }

        console.log(error);
    }
};
