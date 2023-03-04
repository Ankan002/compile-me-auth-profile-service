import jwt, { JwtPayload } from "jsonwebtoken";

interface AuthUrlTokenJWTPayload extends JwtPayload {
    authUrl: string;
}

export const decodeAuthUrl = (encodedAuthUrl: string) => {
    try {
        const data = jwt.decode(encodedAuthUrl) as AuthUrlTokenJWTPayload;

        return {
            success: true,
            data: {
                authUrl: data.authUrl,
            },
        };
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);

            return {
                success: false,
                error: error.message,
            };
        }

        console.log(error);

        return {
            success: false,
            error: "Internal Server Error!!",
        };
    }
};
