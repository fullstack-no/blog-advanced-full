import { CardList, CategoryList, Menu, TopInfo } from "./components";

export default function Home() {
  return (
    <main className="space-y-16">
      <TopInfo />

      <CategoryList />
      <div className="flex flex-col xl:flex-row gap-16 ">
        <div className="basis-3/4 grow-0">
          <CardList />
        </div>
        <Menu />
      </div>
    </main>
  );
}
