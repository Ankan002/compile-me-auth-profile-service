import { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "cookies-next";
import { z } from "zod";
import { validMicroserviceDomains } from "constants/valid-microservice-domains";
import { getPrismaClient } from "config/get-primsa-client";
import jwt from "jsonwebtoken";
import { addDays } from "date-fns";
import { generateUsername } from "utils";

interface SuccessResponse {
    success: boolean;
}

interface ErrorResponse {
    success: boolean;
    error: string;
}

const RequestBodySchema = z.object({
    domain_to_be_authenticated: z.string(),
    user: z.object({
        name: z
            .string()
            .min(3, "Min length of name can be 3")
            .max(60, "Max length of name can be 60"),
        provider: z.union([z.literal("google"), z.literal("github")]),
        provider_id: z.string(),
        email: z.string().email(),
        github_username: z.string().optional(),
        github_profile_url: z.string().optional(),
        profile_pic: z.string().url(),
    }),
});

const login = async (
    req: NextApiRequest,
    res: NextApiResponse<SuccessResponse | ErrorResponse>
) => {
    if (req.method !== "POST") {
        return res.status(400).json({
            success: false,
            error: "Internal Server Error!!",
        });
    }

    const requestBodyValidationResult = RequestBodySchema.safeParse(req.body);

    if (!requestBodyValidationResult.success) {
        return res.status(400).json({
            success: false,
            error: requestBodyValidationResult.error.errors[0].message,
        });
    }

    const requestBody = requestBodyValidationResult.data;

    if (
        process.env.NODE_ENV === "production" &&
        !validMicroserviceDomains.includes(
            requestBody.domain_to_be_authenticated
        )
    ) {
        return res.status(400).json({
            success: false,
            error: "Invalid service domain",
        });
    }

    const prisma = getPrismaClient();

    try {
        const fetchedUser = await prisma.user.findFirst({
            where: {
                provider: requestBody.user.provider,
                provider_id: requestBody.user.provider_id,
            },
            select: {
                id: true,
                email: true,
                provider: true,
                provider_id: true,
            },
        });

        if (fetchedUser) {
            const loginJWTData = {
                user: fetchedUser,
            };

            const authToken = jwt.sign(
                loginJWTData,
                process.env.AUTH_JWT_SECRET ?? "",
                {
                    expiresIn: process.env.AUTH_JWT_EXPIRATION_TIME ?? "",
                }
            );

            setCookie(process.env.AUTH_COOKIE_NAME ?? "", authToken, {
                domain:
                    process.env.NODE_ENV === "production"
                        ? requestBody.domain_to_be_authenticated
                        : "localhost",
                httpOnly: true,
                secure: process.env.NODE_ENV === "production" ? true : false,
                expires: addDays(
                    new Date(),
                    Number(process.env.AUTH_COOKIE_EXPIRATION_TIME ?? "0")
                ),
                req,
                res,
            });

            return res.status(200).json({
                success: true,
            });
        }

        const username = generateUsername(
            requestBody.user.email,
            requestBody.user.provider
        );

        const newUser = await prisma.user.create({
            data: {
                name: requestBody.user.name,
                provider: requestBody.user.provider,
                provider_id: requestBody.user.provider_id,
                username,
                avatar: `https://api.dicebear.com/5.x/avataaars/png?seed=${username}`,
                email: requestBody.user.email,
                profile_pic: requestBody.user.profile_pic,
                github_profile_url: requestBody.user.github_profile_url
                    ? requestBody.user.github_profile_url
                    : null,
                github_username: requestBody.user.github_username
                    ? requestBody.user.github_username
                    : null,
            },
            select: {
                id: true,
                email: true,
                provider: true,
                provider_id: true,
            },
        });

        const loginJWTData = {
            user: newUser,
        };

        const authToken = jwt.sign(
            loginJWTData,
            process.env.AUTH_JWT_SECRET ?? "",
            {
                expiresIn: process.env.AUTH_JWT_EXPIRATION_TIME ?? "",
            }
        );

        setCookie(process.env.AUTH_COOKIE_NAME ?? "", authToken, {
            domain:
                process.env.NODE_ENV === "production"
                    ? requestBody.domain_to_be_authenticated
                    : "localhost",
            httpOnly: true,
            secure: process.env.NODE_ENV === "production" ? true : false,
            expires: addDays(
                new Date(),
                Number(process.env.AUTH_COOKIE_EXPIRATION_TIME ?? "0")
            ),
            req,
            res,
        });

        return res.status(200).json({
            success: true,
        });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({
                success: false,
                error: error.message,
            });
        }

        return res.status(500).json({
            success: false,
            error: "Internal Server Error!!",
        });
    }
};

export default login;
