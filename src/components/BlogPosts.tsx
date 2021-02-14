import { graphql } from "react-relay";
import { useFragment } from "react-relay/hooks";
import { BlogPosts_blogPostConnection$key } from "../lib/__generated__/BlogPosts_blogPostConnection.graphql";
import { BlogPostPreview } from "./BlogPostPreview";

type Props = {
  blogPostConnection: BlogPosts_blogPostConnection$key;
};

export const BlogPosts = ({ blogPostConnection }: Props) => {
  const data = useFragment(
    graphql`
      fragment BlogPosts_blogPostConnection on BlogPostConnection {
        edges {
          node {
            ...BlogPostPreview_post
            id
          }
        }
      }
    `,
    blogPostConnection
  );

  return (
    <div>
      <h1>Blog posts</h1>
      <ul>
        {data.edges?.map((e: any) => (
          <BlogPostPreview key={e?.node.id} post={e?.node!} />
        ))}
      </ul>
    </div>
  );
};
