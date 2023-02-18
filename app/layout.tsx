import { ThemeProvider } from "components/theme-provider";
import { ThemeToggler } from "components/theme-toggler";
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
                    <ThemeProvider>
                        {children}
                        <ThemeToggler />
                    </ThemeProvider>
                </RecoilContextProvider>
            </body>
        </html>
    );
}
