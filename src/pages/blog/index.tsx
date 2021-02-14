import Link from "next/link";
import { fetchQuery, graphql } from "react-relay";
import { initEnvironment } from "../../lib/relay";
import { BlogPosts } from "../../components/BlogPosts";
import { blogQuery, blogQueryResponse } from "../../lib/__generated__/blogQuery.graphql";
import { GetStaticProps } from "next";

const blogPageQuery = graphql`
  query blogQuery($orderBy: BlogPostOrderBy, $first: Int!, $after: String) {
    viewer {
      ...BlogPosts_Viewer
    }
  }
`;

type Props = { data: blogQueryResponse };

const Blog = ({ data: { viewer } }: Props) => {
  return (
    <div>
      <Link href="/">
        <a>home</a>
      </Link>
      <BlogPosts blogPosts={viewer} />
    </div>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const environment = initEnvironment();
  const data = await fetchQuery<blogQuery>(
    environment,
    blogPageQuery,
    {
      first: 10,
      orderBy: { createdAt: "desc" },
      after: undefined,
    },
    null
  );
  const initialRecords = environment.getStore().getSource().toJSON();

  return {
    props: {
      data,
      initialRecords,
    },
  };
};

export default Blog;
