"use client";

import { Theme } from "types/general";
import { Toaster, ToastBar } from "react-hot-toast";
import { useRecoilValue } from "recoil";
import { themeAtom } from "atoms";

const CustomToaster = () => {
    const currentTheme = useRecoilValue<Theme>(themeAtom)

    return (
        <Toaster
            toastOptions={{
                success: {
                    iconTheme: {
                        primary: "#08CD92",
                        secondary: currentTheme === "light" ? "#F1F2F6" : "#10111A",
                    },
                    duration: 1500,
                },
                error: {
                    iconTheme: {
                        primary: "#D61C4E",
                        secondary: currentTheme === "light" ? "#F1F2F6" : "#10111A",
                    },
                    duration: 1500,
                },
            }}
        >
            {(t) => {
                return (
                    <ToastBar
                        toast={t}
                        style={{
                            ...t.style,
                            fontFamily: "'Quicksand', sans-serif",
                            color: currentTheme === "light" ? "#10111A" : "#F1F2F6",
                            border: currentTheme === "light" ? "1px solid #1C1B2B" : "1px solid #F1F2F6",
                            background: currentTheme === "light" ? "#F1F2F6" : "#10111A",
                        }}
                    />
                );
            }}
        </Toaster>
    );
};

export default CustomToaster;
