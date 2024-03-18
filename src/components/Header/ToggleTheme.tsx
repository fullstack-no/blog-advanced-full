"use client";

import { useDarkMode } from "@/hooks/useDarkMode";
import { FaMoon, FaSun, FaCircle } from "react-icons/fa";

export const ToggleTheme = () => {
  const [theme, setTheme] = useDarkMode();

  return (
    <div
      className={`relative flex items-center justify-between w-12 py-1 bg-black dark:bg-white rounded-full cursor-pointer select-none`}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <FaMoon
        size={20}
        className={`text-yellow-500 ${theme === "dark" ? "" : "invisible"}`}
      />

      <FaCircle
        size={20}
        className={`absolute text-slate-500 transition-all ${
          theme === "dark" ? "left-7" : "left-0"
        }`}
      />
      <FaSun
        size={20}
        className={`text-yellow-500 ${theme === "dark" ? "invisible" : ""}`}
      />
    </div>
  );
};
