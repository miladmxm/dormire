"use client";

import type { Route } from "next";

import Link from "next/link";

import type { Article } from "@/services/article/types";

import Carusel, {
  CaruselContent,
  CaruselControllers,
} from "@/components/ui/carusel";
import DefaultImage from "@/components/ui/defaultImage";
import { useIsMobile } from "@/hooks/use-mobile";
import { fullDateNumberFormat } from "@/utils/fullDateWithFormat";

import ArticleDetails from "../../_components/articleDetails";

const PinArticleCard = ({
  title,
  slug,
  excerpt,
  pageTitle,
  createdAt,
  readingTime,
  thumbnail,
}: Article & { pageTitle: string }) => {
  const articleLink = `/article/${slug}` as Route;
  return (
    <div className="relative pt-10 lg:py-10 isolate">
      <div className="lg:absolute right-0 -z-10 lg:top-10 inset-x-0 max-lg:pb-6 relative">
        <h1 className="text-2xl lg:text-3xl font-bold">{pageTitle}</h1>
        <div className="h-px opacity-80 bg-primary-600 absolute bottom-7 lg:bottom-1 inset-x-0" />
        <div className="h-px opacity-80 bg-primary-600 absolute -bottom-18 inset-x-0" />
      </div>
      <article className="flex items-end lg:flex-row flex-col-reverse">
        <ArticleDetails
          slug={slug}
          createdAt={createdAt}
          excerpt={excerpt}
          readingTime={readingTime}
          title={title}
          className="lg:w-[45%] max-lg:-translate-y-2/12 w-11/12 mx-auto"
        />
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

const HighlightCard = ({
  thumbnail,
  title,
  createdAt,
  readingTime,
  slug,
  className,
}: Article & { className?: string }) => {
  const createdAtString = fullDateNumberFormat(createdAt);
  const articleLink = `/article/${slug}` as Route;
  return (
    <article className={className}>
      <Link
        href={articleLink}
        className="relative transition-all hover:drop-shadow-xl hover:scale-[1.01] duration-500 overflow-hidden flex items-end p-6 lg:p-10 rounded-3xl lg:rounded-7xl size-full"
      >
        <DefaultImage
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          image={thumbnail}
          fill
        />
        <div className="absolute inset-0 bg-linear-to-b from-15% from-transparent to-primary-900" />

        <div className="z-10 text-white relative flex flex-col gap-4">
          <div className="flex items-center gap-6 lg:gap-10 font-semibold text-sm">
            <time dateTime={createdAtString}>تاریخ: {createdAtString}</time>
            <span> زمان مطالعه: {readingTime || "چند دقیقه"}</span>
          </div>
          <h3 className="lg:text-lg font-bold">{title}</h3>
        </div>
      </Link>
    </article>
  );
};

const HighlightWrapper = ({ articles }: { articles: Article[] }) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div>
        <Carusel config={{ loop: true }}>
          <CaruselContent>
            {articles.map((article) => (
              <HighlightCard
                className="flex-size-100 px-2 aspect-video"
                key={article.id}
                {...article}
              />
            ))}
          </CaruselContent>
          <CaruselControllers className="mt-6" />
        </Carusel>
      </div>
    );
  }

  return (
    <div className="grid gap-6 grid-cols-20 *:nth-[4]:col-span-11 *:col-span-9 *:nth-[1]:col-span-11 grid-rows-2 h-[70svh]">
      {articles.map((article) => (
        <HighlightCard key={article.id} {...article} />
      ))}
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
      <HighlightWrapper articles={articles.slice(1)} />
    </section>
  );
};

export default Highlight;
