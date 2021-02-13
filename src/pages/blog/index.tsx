import Link from "next/link";
import { fetchQuery, graphql } from "react-relay";
import { initEnvironment } from "../../lib/relay";
import { BlogPosts } from "../../components/BlogPosts";
import {
  blogQuery,
  blogQueryResponse,
} from "../../lib/__generated__/blogQuery.graphql";
import { GetStaticProps } from "next";

const blogPageQuery = graphql`
  query blogQuery {
    viewer {
      ...BlogPosts_viewer
    }
  }
`;

type Props = blogQueryResponse;

const Blog = ({ viewer }: Props) => (
  <div>
    <Link href="/">
      <a>home</a>
    </Link>
    <BlogPosts viewer={viewer} />
  </div>
);

export const getStaticProps: GetStaticProps<Props> = async () => {
  const environment = initEnvironment();
  const data = await fetchQuery<blogQuery>(
    environment,
    blogPageQuery,
    {},
    null
  );
  const initialRecords = environment.getStore().getSource().toJSON();

  return {
    props: {
      ...data,
      initialRecords,
    },
  };
};

export default Blog;
