import { ThemeProvider } from "components/theme-provider";
import { ThemeToggler } from "components/theme-toggler";
import { CustomToaster, RecoilContextProvider } from "components/elements";
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
                        <CustomToaster />
                        <ThemeToggler />
                    </ThemeProvider>
                </RecoilContextProvider>
            </body>
        </html>
    );
}
