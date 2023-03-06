import { z } from "zod";
import { validMicroserviceDomains } from "constants/valid-microservice-domains";

const LoginUserPayloadSchema = z.object({
    name: z
        .string()
        .min(3, "Min length of name can be 3")
        .max(60, "Max length of name can be 60"),
    provider: z.union([z.literal("google"), z.literal("github")]),
    provider_id: z.string(),
    email: z.string().email().optional(),
    github_username: z.string().optional(),
    github_profile_url: z.string().optional(),
    profile_pic: z.string().url(),
});

type LoginUserPayload = z.infer<typeof LoginUserPayloadSchema>;

const SuccessResponseSchema = z.object({
    success: z.literal(true),
});

const ErrorResponseSchema = z.object({
    success: z.literal(false),
    error: z.string(),
});

export const login = async (
    authDomain: string,
    loginUserPayload: LoginUserPayload
) => {
    try {
        if (
            process.env.NEXT_PUBLIC_ENV === "production" &&
            !validMicroserviceDomains.includes(authDomain)
        ) {
            return {
                success: false,
                error: "Invalid Service Domain",
            };
        }

        const loginUserPayloadSchemaValidationResult =
            LoginUserPayloadSchema.safeParse(loginUserPayload);

        if (!loginUserPayloadSchemaValidationResult.success) {
            return {
                success: false,
                error: loginUserPayloadSchemaValidationResult.error.errors[0]
                    .message,
            };
        }

        const loginResponse = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                user: loginUserPayload,
            }),
            credentials: "include",
        });

        const loginResponseData = await loginResponse.json();

        if (!loginResponseData.success) {
            const errorLoginResponseValidationResult =
                ErrorResponseSchema.safeParse(loginResponseData);

            if (!errorLoginResponseValidationResult.success) {
                return {
                    success: false,
                    error: errorLoginResponseValidationResult.error.errors[0]
                        .message,
                };
            }

            const errorLoginResponse = errorLoginResponseValidationResult.data;

            return {
                success: errorLoginResponse.success,
                error: errorLoginResponse.error,
            };
        }

        const successLoginResponseDataValidationResult =
            SuccessResponseSchema.safeParse(loginResponseData);

        if (!successLoginResponseDataValidationResult.success) {
            return {
                success: false,
                error: successLoginResponseDataValidationResult.error.errors[0]
                    .message,
            };
        }

        const successLoginResponse =
            successLoginResponseDataValidationResult.data;

        return {
            success: successLoginResponse.success,
        };
    } catch (error) {
        if (error instanceof Error) {
            return {
                success: false,
                error: error.message,
            };
        }

        return {
            success: false,
            error: "Internal Server Error!!",
        };
    }
};
