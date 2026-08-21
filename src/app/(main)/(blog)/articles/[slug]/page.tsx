const ArticlesPage = async ({ params }: PageProps<"/articles/[slug]">) => {
  const { slug } = await params;
  return <div>{slug}</div>;
};

export default ArticlesPage;
