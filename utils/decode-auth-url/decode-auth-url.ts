import jwt, {Secret} from "jsonwebtoken";

export const decodeAuthUrl = (encodedAuthUrl: string) => {
    console.log(process.env["AUTH_URL_QUERY_JWT_SECRET"])

    try {
        const sec: Secret = process.env.NEXT_PUBLIC_AUTH_URL_QUERY_JWT_SECRET as string;

        // console.log(sec)

        // const someData = {
        //     d: "Ankan"
        // };

        // const token = jwt.sign(someData, sec);

        // console.log(token);

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
