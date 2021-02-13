import Link from "next/link";
import { fetchQuery, graphql } from "react-relay";
import { initEnvironment } from "../../lib/relay";
import BlogPosts from "../../components/BlogPosts";
import { blogQuery } from "../../lib/__generated__/blogQuery.graphql";

const blogPageQuery = graphql`
  query blogQuery {
    viewer {
      ...BlogPosts_viewer
    }
  }
`;

const Blog = ({ viewer }) => (
  <div>
    <Link href="/">
      <a>home</a>
    </Link>
    <BlogPosts viewer={viewer} />
  </div>
);

export async function getStaticProps() {
  const environment = initEnvironment();
  const { viewer } = await fetchQuery<blogQuery>(
    environment,
    blogPageQuery,
    {},
    null
  );
  const initialRecords = environment.getStore().getSource().toJSON();

  console.log({
    viewer,
    initialRecords,
  });

  return {
    props: {
      viewer,
      initialRecords,
    },
  };
}

export default Blog;
