import type { Route } from "next";

import Link from "next/link";

import type { Article } from "@/services/article/types";

import DefaultImage from "@/components/ui/defaultImage";

import ArticleDetails from "../_components/articleDetails";

const ArticleCard = ({
  title,
  thumbnail,
  createdAt,
  excerpt,
  readingTime,
  slug,
}: Article) => {
  const articleLink = `/article/${slug}` as Route;
  return (
    <article className="lg:grid flex flex-col isolate lg:grid-cols-20 lg:grid-rows-1 relative">
      <div className="w-full h-px bg-primary-600 opacity-80 -z-10 absolute top-1/6" />
      <div className="w-full h-px bg-primary-600 opacity-80 -z-10 absolute top-2/6" />
      <Link
        href={articleLink}
        className="-z-10 col-start-1 col-end-12 row-start-1 row-end-2"
      >
        <DefaultImage
          className="aspect-video size-full shadow-sm-gray rounded-3xl lg:rounded-7xl"
          image={thumbnail}
        />
      </Link>
      <div className="lg:col-start-10 lg:col-end-21 lg:row-start-1 lg:row-end-2 flex max-lg:-translate-y-10 w-11/12 mx-auto lg:pb-10">
        <ArticleDetails
          className="h-fit mt-auto w-full"
          createdAt={createdAt}
          excerpt={excerpt}
          readingTime={readingTime}
          slug={slug}
          title={title}
        />
      </div>
    </article>
  );
};

const MainArticlesWrapper = ({ articles }: { articles: Article[] }) => {
  return (
    <section className="flex flex-col container py-22 lg:gap-8">
      {articles.map((article) => (
        <ArticleCard key={article.id} {...article} />
      ))}
    </section>
  );
};

export default MainArticlesWrapper;
