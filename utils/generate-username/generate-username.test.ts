import { generateUsername } from "./generate-username";
import { z } from "zod";

const TestCasesSchema = z.array(
    z.object({
        case: z.object({
            email: z.string().email(),
            provider: z.union([
                z.literal("google"),
                z.literal("github")
            ])
        }),
        result: z.string()
    })
)

const testCases: z.infer<typeof TestCasesSchema> = [
    {
        case: {
            email: "ankanbhattacharya89@gmail.com",
            provider: "google",
        },
        result: "ankanbhattacharya89_gal",
    },
    {
        case: {
            email: "ankanbhattacharya89@gmail.com",
            provider: "github",
        },
        result: "ankanbhattacharya89_git",
    },
];

testCases.forEach((testCase, index) => {
    test(`Test Case: ${index + 1}`, () => {
        expect(
            generateUsername(testCase.case.email, testCase.case.provider)
        ).toBe(testCase.result);
    });
});
