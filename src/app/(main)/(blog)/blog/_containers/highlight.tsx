import type { Route } from "next";

import Link from "next/link";

import type { Article } from "@/services/article/types";

import DefaultImage from "@/components/ui/defaultImage";
import { fullDateNumberFormat } from "@/utils/fullDateWithFormat";

const PinArticleCard = ({
  title,
  slug,
  excerpt,
  pageTitle,
  createdAt,
  readingTime,
  thumbnail,
}: Article & { pageTitle: string }) => {
  const createdAtString = fullDateNumberFormat(createdAt);
  const articleLink = `/article/${slug}` as Route;
  return (
    <div className="relative py-10 isolate">
      <div className="lg:absolute right-0 -z-10 lg:top-10 inset-x-0 max-lg:pb-6 relative">
        <h1 className="text-2xl lg:text-3xl font-bold">{pageTitle}</h1>
        <div className="h-px opacity-80 bg-primary-600 absolute bottom-7 lg:bottom-1 inset-x-0" />
        <div className="h-px opacity-80 bg-primary-600 absolute -bottom-18 inset-x-0" />
      </div>
      <article className="flex items-end lg:flex-row flex-col-reverse">
        <div className="bg-white p-4 lg:p-8 z-10 rounded-4xl lg:rounded-7xl flex flex-col gap-4 lg:w-[45%] max-lg:-translate-y-2/12 w-11/12 mx-auto">
          <h3 className="lg:text-lg font-bold">
            <Link href={articleLink}>{title}</Link>
          </h3>
          <p className="text-xs text-justify md:text-sm font-light">
            {excerpt}
          </p>
          <div className="flex items-center justify-between gap-4 font-semibold text-sm">
            <time dateTime={createdAtString}>تاریخ: {createdAtString}</time>
            <span> زمان مطالعه: {readingTime || "چند دقیقه"}</span>
          </div>
        </div>
        <Link href={articleLink} className="lg:w-[55%] w-full block">
          <DefaultImage
            className="rounded-4xl lg:rounded-7xl size-full lg:origin-left shadow-sm-gray lg:scale-110"
            image={thumbnail}
          />
        </Link>
      </article>
    </div>
  );
};

const Highlight = ({
  title,
  articles,
}: {
  title: string;
  articles: Article[];
}) => {
  return (
    <section className="container">
      <PinArticleCard {...articles[0]} pageTitle={title} />
    </section>
  );
};

export default Highlight;
