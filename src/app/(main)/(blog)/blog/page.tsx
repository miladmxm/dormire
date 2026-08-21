import { Suspense } from "react";

import { getPublicArticles } from "@/features/article/dal/query";

import ArticleFilters from "../_components/articleFilters";
import MainArticlesWrapper from "../_containers/mainWrapper";
import Highlight from "./_containers/highlight";

const BlogPage = async ({ searchParams }: PageProps<"/blog">) => {
  const topArticles = await getPublicArticles({ limit: 5, offset: 0 });
  const articles = await getPublicArticles();
  return (
    <main>
      <Highlight articles={topArticles} title="وبلاگ" />
      <Suspense>
        <ArticleFilters searchParams={searchParams} />
      </Suspense>
      <MainArticlesWrapper articles={articles} />
    </main>
  );
};

export default BlogPage;
