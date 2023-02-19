import LoginHeroImage from "assets/login-hero-image.png";
import Image from "next/image";

export default function Home() {
    return (
        <main className="min-h-screen flex flex-col w-full bg-primary-light dark:bg-primary-dark items-center justify-center p-3">
            <Image src={LoginHeroImage.src} width={400} height={400} alt="" className="sm:w-96 sm:h-96 w-80 h-80" priority />

            <h1 className="font-quicksand text-4xl tracking-widest text-secondary-orange dark:text-primary-green font-semibold text-center">
                COMPILE ME
            </h1>

            <p className="font-fira-code text-xl tracking-wider text-primary-dark dark:text-primary-light mt-5 md:w-1/3 sm:w-2/3 w-full text-center">
                Sign in to the world of tech and software
            </p>
        </main>
    );
}
