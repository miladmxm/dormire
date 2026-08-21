import { getPublicArticles } from "@/features/article/dal/query";

import MainArticlesWrapper from "../_containers/mainWrapper";
import Highlight from "./_containers/highlight";

const BlogPage = async ({ searchParams }: PageProps<"/blog">) => {
  const topArticles = await getPublicArticles({ limit: 5, offset: 0 });
  const articles = await getPublicArticles();
  return (
    <main>
      <Highlight articles={topArticles} title="وبلاگ" />
      <MainArticlesWrapper articles={articles} />
    </main>
  );
};

export default BlogPage;
