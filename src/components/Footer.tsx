import Image from "next/image";
import Link from "next/link";
import { Logos } from "./Logos";

export const Footer = () => {
  return (
    <div className="bg-slate-200 dark:bg-slate-700 py-8">
      <div className="container mx-auto px-4 flex flex-col xl:flex-row  justify-between gap-x-10 gap-y-16">
        <div className="basis-1/2 grow-0 space-y-6">
          <div className="flex items-center gap-4">
            <Image
              src="/fall.jpg"
              alt=""
              width={40}
              height={40}
              className="w-12 h-12 rounded-full"
            />

            <h1 className="text-2xl font-bold">Super Blog</h1>
          </div>

          <p className="text-slate-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
            aliquam, veritatis quibusdam repellat distinctio animi quod
            cupiditate voluptatem a illum nisi saepe nihil provident
            consequuntur quam quos deserunt ipsum iste.
          </p>

          <div className="flex items-center gap-4">
            <Logos />
          </div>
        </div>

        <div className="flex gap-16">
          <div className="space-y-6 *:block">
            <h1 className="font-bold text-xl">Links</h1>
            <Link href="/">Home Page</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </div>

          <div className="space-y-6 *:block">
            <h1 className="font-bold text-xl">Tags</h1>

            <Link href="/">Home Page</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </div>

          <div className="space-y-6 *:block">
            <h1 className="font-bold text-xl">Social</h1>

            <Link href="/">Home Page</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
