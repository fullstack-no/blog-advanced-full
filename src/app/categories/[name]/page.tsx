import { CardList, Menu } from "@/app/components";

const CategoryPage = (req: any) => {
  const { params, searchParams } = req;

  const { name } = params;

  return (
    <div className="space-y-16">
      <h1 className="capitalize text-2xl font-bold p-4 text-center w-full bg-orange-300 dark:text-white text-slate-800">
        {name} blog
      </h1>

      <div className="flex gap-8">
        <div className="basis-3/4 grow-0">
          <CardList category={name} />
        </div>

        <div className="basis-1/4 grow-0">
          <Menu category={name.replace(" ", "")} />
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
