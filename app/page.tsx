import heroImage from "assets/hero-image.svg";
import Image from "next/image";

export default function Home() {
    return (
        <main className="min-h-screen flex flex-col w-full bg-primary-light dark:bg-primary-dark items-center justify-center p-3">
            <Image src={heroImage} width={300} height={300} alt="" className="w-96 h-96" />

            <h1 className="font-quicksand text-4xl tracking-widest text-primary-orange dark:text-primary-green font-extrabold text-center">
                COMPILE ME
            </h1>

            <p className="font-fira-code text-2xl tracking-wider text-primary-dark dark:text-primary-light mt-5 md:w-1/3 sm:w-2/3 w-full text-center">
                Sign in to the world of tech and software
            </p>
        </main>
    );
}
