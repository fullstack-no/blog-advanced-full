import { useEffect, useRef, useState } from "react";

type Mode = "light" | "dark";

// export const useDarkMode = () => {
//   const KEY = "theme";
//   const [theme, setTheme] = useState<Mode>(() => {
//     if (typeof window !== "undefined") {
//       const data = localStorage.getItem(KEY);

//       if (!data || data === "light") return "light";
//     }
//     return "dark";
//   });

//   useEffect(() => {
//     localStorage.setItem(KEY, theme);
//     if (theme === "light") {
//       document.documentElement.classList.remove("dark");
//     } else {
//       document.documentElement.classList.add("dark");
//     }
//   }, [setTheme, theme]);

//   return [theme, setTheme] as [typeof theme, typeof setTheme];
// };

export const useDarkMode = () => {
  const KEY = "theme";
  const isMounted = useRef(false);
  const [theme, setTheme] = useState<Mode>("light");

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const item = localStorage.getItem(KEY);

        if (!item || item === "light") setTheme("light");
        else setTheme("dark");

        return () => {
          isMounted.current = false;
        };
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      localStorage.setItem(KEY, theme);
      if (theme === "light") {
        document.documentElement.classList.remove("dark");
      } else {
        document.documentElement.classList.add("dark");
      }
    } else {
      isMounted.current = true;
    }
  }, [setTheme, theme]);
  return [theme, setTheme] as [typeof theme, typeof setTheme];
};
