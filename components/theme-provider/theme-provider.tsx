"use client";

import { themeAtom } from "atoms";
import { Theme } from "types/general";
import { ReactNode, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";

interface Props {
    children: ReactNode;
}

const ThemeProvider = (props: Props) => {
    const { children } = props;

    const [currentTheme, setCurrentTheme] = useRecoilState<Theme>(themeAtom);
    const isLoaded = useRef<boolean>(false);

    const loadTheme = () => {
        const savedTheme = localStorage.getItem("theme");

        if (!savedTheme || (savedTheme !== "light" && savedTheme !== "dark")) {
            localStorage.setItem("theme", currentTheme);
            return;
        }

        setCurrentTheme(savedTheme);
    };

    useEffect(() => {
        if (window === undefined || isLoaded.current) return;

        isLoaded.current = true;
        loadTheme();
    }, []);

    return <div className={`${currentTheme}`}>{children}</div>;
};

export default ThemeProvider;
