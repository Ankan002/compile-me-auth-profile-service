import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

const decode = (token: string, secret: string) => {
    const data = jwt.verify(token, secret);

    return data;
}


const dec = (req: NextApiRequest, res: NextApiResponse) => {
    const sec = process.env.AUTH_URL_QUERY_JWT_SECRET ?? "an@@an@@06*&2002mlo13031$1loatk";
    const { authUrlToken } = req.query;

    console.log(authUrlToken)
    console.log(sec)

    try {

        const data = jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.NIB2uMEMKTYFI-jrzvzkHSQt5uLknceIAOL8bHLNSaY", `${sec}`);

        // const data = decode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.NIB2uMEMKTYFI-jrzvzkHSQt5uLknceIAOL8bHLNSaY", sec)

        return res.status(200).json(data);

        // console.log(data);
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.stack);
            return res.status(400).json({
                error: error.message,
            });
        }

        console.log(error);

        return res.status(500).json({
            error: "Internal Server Error!!",
        });
    }
};

export default dec;
