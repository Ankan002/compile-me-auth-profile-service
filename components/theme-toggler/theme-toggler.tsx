"use client";

import { Theme } from "types/general";
import { useRecoilState } from "recoil";
import { themeAtom } from "atoms";
import { FaMoon } from "react-icons/fa";
import { BsSunFill } from "react-icons/bs";

const ThemeToggler = () => {
    const [currentTheme, setCurrentTheme] = useRecoilState<Theme>(themeAtom);

    const onChangeThemeClick = () => {
        setCurrentTheme((prev) => {
            if (prev === "light") {
                localStorage.setItem("theme", "dark");
                return "dark";
            }

            localStorage.setItem("theme", "light");
            return "light";
        });
    };

    return (
        <button className="border-2 rounded-md border-primary-dark bg-primary-yellow p-2 dark:border-primary-light dark:bg-primary-orange fixed bottom-5 right-5 hover:shadow-md text-primary-dark dark:text-primary-light transition-none" onClick={onChangeThemeClick} aria-label="toggle-theme">
            {
                (currentTheme === "light") ? (
                    <FaMoon size={19} />
                ) : (
                    <BsSunFill size={19} />
                )
            }
        </button>
    );
};

export default ThemeToggler;
