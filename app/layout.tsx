import { ThemeProvider } from "@/components/theme-provider";
import { RecoilContextProvider } from "components/elements";
import "./globals.css";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head />
            <body>
                <RecoilContextProvider>
                    <ThemeProvider>{children}</ThemeProvider>
                </RecoilContextProvider>
            </body>
        </html>
    );
}
