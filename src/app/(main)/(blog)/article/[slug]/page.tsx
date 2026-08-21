const ArticlePage = async ({ params }: PageProps<"/article/[slug]">) => {
  const { slug } = await params;
  return <div>{slug}</div>;
};

export default ArticlePage;
