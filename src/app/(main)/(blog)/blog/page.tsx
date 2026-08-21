import { getPublicArticles } from "@/features/article/dal/query";

import Highlight from "./_containers/highlight";

const BlogPage = async ({ searchParams }: PageProps<"/blog">) => {
  const articles = await getPublicArticles({ limit: 5, offset: 0 });
  return (
    <main>
      <Highlight articles={articles} title="وبلاگ" />
    </main>
  );
};

export default BlogPage;
