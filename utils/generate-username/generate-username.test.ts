import { generateUsernameFromEmail } from "./generate-username";
import { z } from "zod";

const TestCasesSchema = z.array(
    z.object({
        case: z.object({
            email: z.string().email(),
        }),
        result: z.string()
    })
)

const testCases: z.infer<typeof TestCasesSchema> = [
    {
        case: {
            email: "ankanbhattacharya89@gmail.com",
        },
        result: "ankanbhattacharya89_gal",
    },
    {
        case: {
            email: "ankanbhattacharya117@gmail.com",
        },
        result: "ankanbhattacharya117_gal",
    },
];

testCases.forEach((testCase, index) => {
    test(`Test Case: ${index + 1}`, () => {
        expect(
            generateUsernameFromEmail(testCase.case.email)
        ).toBe(testCase.result);
    });
});
