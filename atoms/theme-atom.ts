import { Theme } from "types/general";
import { atom } from "recoil";

export const themeAtom = atom<Theme>({
    key: "themeAtom",
    default: "light",
});
