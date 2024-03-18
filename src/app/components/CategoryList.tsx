import Image from "next/image";
import Link from "next/link";

const bgcolors = [
  "bg-sky-500",
  "bg-red-500",
  "bg-lime-500",
  "bg-yellow-500",
  "bg-green-500",
  "bg-orange-500",
  "bg-violet-500",
];

export const CategoryList = async () => {
  const data: any[] = await (
    await fetch(process.env.SERVER_URL + "/api/categories")
  ).json();

  console.log(data);

  return (
    <div className="space-y-8">
      <h1 className="text-xl font-bold">Popular Categories</h1>

      <ul className="flex flex-wrap items-center gap-4">
        {data?.map((category, idx) => (
          <li key={category.id}>
            <Link
              href={`/categories/${category.slug}`}
              className={`py-3 px-4 w-40 flex items-center justify-center gap-2  rounded-md cursor-pointer ${bgcolors[idx]} `}
            >
              <Image
                src={category.image || "/fall.jpg"}
                alt=""
                width={40}
                height={40}
                className="w-8 h-8 rounded-full"
              />

              <p className="font-medium">{category.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
