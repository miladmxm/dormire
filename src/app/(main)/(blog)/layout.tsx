import { Suspense } from "react";

const BlogLayout = ({ children }: LayoutProps<"/">) => {
  return <Suspense>{children}</Suspense>;
};

export default BlogLayout;
