import type { Route } from "next";

import Link from "next/link";

import SeparatorLine from "@/components/ui/separatorLine";
import { getPublicArticleCategories } from "@/features/article/dal/query";
import { cn } from "@/lib/utils";

const Filters: { label: string; sort: string }[] = [
  {
    label: "جدیدترین",
    sort: "new",
  },
  {
    label: "پر بازدید ترین",
    sort: "view",
  },
];

const ArticleFilters = async ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) => {
  const paramsSort = (await searchParams).sort;
  const categories = await getPublicArticleCategories();
  return (
    <section className="container py-10 space-y-2">
      <div className="overflow-x-auto">
        <div className="flex flex-row gap-6 w-max">
          {Filters.map(({ label, sort }) => (
            <Link
              className={cn({ "text-secondary-500": sort === paramsSort })}
              key={label + sort}
              href={`?sort=${sort}`}
              scroll={false}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
      <SeparatorLine size="4" />
      <div className="overflow-x-auto">
        <div className="flex flex-row gap-6 w-max">
          {categories.map(({ name, slug }) => (
            <Link
              className={cn({ "text-secondary-500": true })}
              key={slug}
              href={`/articles/${slug}` as Route}
              scroll={false}
            >
              {name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArticleFilters;
