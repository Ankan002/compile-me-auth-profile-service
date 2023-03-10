import { LoginBtn, Redirect } from "components/elements";
import LoginHeroImage from "assets/login-hero-image.png";
import Image from "next/image";
import { decodeAuthUrl } from "utils";
import { cookies } from "next/headers"; 
import { redirect } from "next/navigation";

interface Props {
    searchParams: {
        authUrlToken: string | undefined;
    };
}

export default function Home(props: Props) {
    const { searchParams } = props;
    const { authUrlToken } = searchParams;
    let authUrl: string | null = null;

    const nextCookies = cookies();
    const authCookieToken = nextCookies.get(process.env.AUTH_COOKIE_NAME ?? "")?.value;

    if (authUrlToken) {
        const authUrlResponse = decodeAuthUrl(authUrlToken);

        if (authUrlResponse.success && authUrlResponse.data) {
            if(authCookieToken) {
                return <Redirect redirectUrl={authUrlResponse.data.authUrl} />
            }

            authUrl = authUrlResponse.data.authUrl;
        }
    }

    

    return (
        <main className="min-h-screen flex flex-col w-full bg-primary-light dark:bg-primary-dark items-center justify-center p-3">
            <Image
                src={LoginHeroImage.src}
                width={400}
                height={400}
                alt=""
                className="sm:w-96 sm:h-96 w-80 h-80"
                priority
            />

            <h1 className="font-quicksand text-4xl tracking-widest text-secondary-orange dark:text-primary-green font-semibold text-center">
                COMPILE ME
            </h1>

            <p className="font-fira-code text-xl tracking-wider text-primary-dark dark:text-primary-light mt-5 md:w-1/3 sm:w-2/3 w-full text-center">
                Sign in to the world of tech and software
            </p>

            <div className="flex items-center justify-center mt-4">
                <LoginBtn provider="google" authUrl={authUrl} />
                <LoginBtn provider="github" authUrl={authUrl} />
            </div>
        </main>
    );
}

export const revalidate = 0;
