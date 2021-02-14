import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { fetchQuery } from "react-relay";
import { BlogPost } from "../../components/BlogPost";
import { blogPostQuery } from "../../lib/operations/BlogPost";
import { blogPostIdsQuery } from "../../lib/operations/BlogPostIds";
import { initEnvironment } from "../../lib/relay";
import { BlogPostIdsQuery } from "../../lib/__generated__/BlogPostIdsQuery.graphql";
import {
  BlogPostQuery,
  BlogPostQueryResponse,
} from "../../lib/__generated__/BlogPostQuery.graphql";

type Props = {
  data?: BlogPostQueryResponse;
};

export default function BlogPostPage(props: Props) {
  return (
    <div>
      <div>
        <Link href="/">
          <a>Home</a>
        </Link>
      </div>
      <div>
        <Link href="/blog">
          <a>Blog</a>
        </Link>
      </div>
      {props.data ? <BlogPost post={props.data.viewer.BlogPost} /> : null}
    </div>
  );
}

export const getStaticProps: GetStaticProps<Props, { id: string }> = async (ctx) => {
  const environment = initEnvironment();
  const id = ctx.params?.id;
  if (!id) {
    return {
      props: {},
    };
  }

  const data = await fetchQuery<BlogPostQuery>(environment, blogPostQuery, { id }, null);
  const initialRecords = environment.getStore().getSource().toJSON();

  return {
    props: {
      data,
      initialRecords,
    },
  };
};

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  const environment = initEnvironment();
  const data = await fetchQuery<BlogPostIdsQuery>(
    environment,
    blogPostIdsQuery,
    { first: 10 },
    null
  );

  return {
    paths:
      data.viewer.allBlogPosts.edges
        ?.map((e) => e?.node.id)
        .filter((id) => id)
        .map((id) => ({ params: { id: id! } })) ?? [],
    fallback: true,
  };
};
