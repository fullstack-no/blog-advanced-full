import Link from "next/link";
import { Logos } from "../Logos";
import { Corner } from "./Corner";
import { ToggleTheme } from "./ToggleTheme";

export const Header = () => {
  return (
    <div className="relative py-6 border-b border-slate-300 flex items-center justify-between">
      <div className="hidden xl:block">
        <Logos />
      </div>

      <div className="ml-auto order-2 xl:order-1 flex items-center gap-4 text-slate-500 lg:text-xl 2xl:text-2xl">
        <ToggleTheme />
        <Link
          href="/"
          className=" hover:text-slate-700 dark:hover:text-slate-300"
        >
          Homepage
        </Link>
        <Link
          href="/contact"
          className=" hover:text-slate-700 dark:hover:text-slate-300"
        >
          Contact
        </Link>
        <Link
          href="/about"
          className=" hover:text-slate-700 dark:hover:text-slate-300"
        >
          About
        </Link>
        <Corner />
      </div>

      <div className="hidden md:block order-1 xl:absolute top-1/2 left-1/2 xl:-translate-x-1/2 xl:-translate-y-1/2 text-4xl font-bold lg:text-4xl xl:text-5xl">
        Super Blog
      </div>
    </div>
  );
};
