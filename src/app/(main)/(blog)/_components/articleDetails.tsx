import type { Route } from "next";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { fullDateNumberFormat } from "@/utils/fullDateWithFormat";

const ArticleDetails = ({
  slug,
  createdAt,
  readingTime,
  excerpt,
  title,
  className,
}: {
  slug: string;
  title: string;
  createdAt: Date;
  readingTime: number | null;
  excerpt: string;
  className?: string;
}) => {
  const createdAtString = fullDateNumberFormat(createdAt);
  const articleLink = `/article/${slug}` as Route;
  return (
    <div
      className={cn(
        "bg-white p-4 lg:p-8 z-10 rounded-4xl lg:rounded-7xl flex flex-col gap-4 ",
        className,
      )}
    >
      <h3 className="lg:text-lg font-bold">
        <Link href={articleLink}>{title}</Link>
      </h3>
      <p className="text-xs line-clamp-4 text-justify md:text-sm font-light">
        {excerpt}
      </p>
      <div className="flex items-center justify-between gap-4 font-semibold text-sm">
        <time dateTime={createdAtString}>تاریخ: {createdAtString}</time>
        <span> زمان مطالعه: {readingTime || "چند دقیقه"}</span>
      </div>
    </div>
  );
};

export default ArticleDetails;
