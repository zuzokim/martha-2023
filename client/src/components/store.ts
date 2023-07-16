import { create } from "zustand";
import { PREV_NAV_PATH, NEXT_NAV_PATH, NavigationType } from "./constants";

export interface PathStoreState {
  prevPath: string | null;
  nextPath: string | null;
  setPrevPath: (prevPath: string | null) => void;
  setNextPath: (nextPath: string | null) => void;
  path: string;
  setPath: (path: string) => void;
}

export const usePathStore = create<PathStoreState>((set) => ({
  prevPath: null,
  nextPath: "about",
  path: "/",
  setPrevPath: (prevPath) => set({ prevPath }),
  setNextPath: (nextPath) => set({ nextPath }),
  setPath: (path) => {
    // / => main
    const pathname = path;
    const modifiedPathname = pathname.slice(1);

    const pathKey = modifiedPathname.length === 0 ? "main" : modifiedPathname; // Remove the leading slash

    console.log(pathname, "store pathname"); // Output: "pathname"
    set({
      prevPath: PREV_NAV_PATH[pathKey as NavigationType],
      nextPath: NEXT_NAV_PATH[pathKey as NavigationType],
    });
  },
}));
