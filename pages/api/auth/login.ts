import { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "cookies-next";

const login = (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") {
        return res.status(400).json({
            success: false,
            error: "Method not allowed",
        });
    }

    setCookie("token", `${Math.random().toFixed(3)}`, {
        req,
        res,
        httpOnly: true,
        secure: process.env.NODE_ENV === "development" ? false : true,
        domain: process.env.NODE_ENV === "development" ? "localhost" : ".compile-me.com"
    });

    return res.status(200).json({
        success: true,
    });
};

export default login;
