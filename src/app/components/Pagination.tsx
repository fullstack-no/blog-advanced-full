"use client";

import { useRouter } from "next/navigation";

type PaginationProps = {
  page: number;
  total: number;
  setPage: any;
};

export const Pagination = ({ page, total, setPage }: PaginationProps) => {
  const LIMIT = 2;

  const hasPrev = page > 1;
  const hasNext = (page - 1) * LIMIT + LIMIT < total;

  return (
    <div className="flex items-center justify-between w-full">
      <button
        disabled={!hasPrev}
        className="px-3 py-2 bg-red-500 hover:bg-red-600 dark:hover:bg-red-400 text-slate-200 disabled:bg-slate-500 disabled:hover:bg-slate-500"
        onClick={() => setPage(page - 1)}
      >
        previous
      </button>

      <button
        disabled={!hasNext}
        className="px-3 py-2 bg-red-500 hover:bg-red-600 dark:hover:bg-red-400 text-slate-200 disabled:bg-slate-500 disabled:hover:bg-slate-500"
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>
    </div>
  );
};
