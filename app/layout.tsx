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
                <RecoilContextProvider>{children}</RecoilContextProvider>
            </body>
        </html>
    );
}
