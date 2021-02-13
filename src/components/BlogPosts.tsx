import { graphql } from "react-relay";
import { useFragment } from "react-relay/hooks";
import { BlogPosts_viewer$key } from "../lib/__generated__/BlogPosts_viewer.graphql";
import { BlogPostPreview } from "./BlogPostPreview";

type Props = {
  viewer: BlogPosts_viewer$key;
};

export const BlogPosts = ({ viewer }: Props) => {
  const data = useFragment(
    graphql`
      fragment BlogPosts_viewer on Viewer {
        allBlogPosts(first: 10, orderBy: { createdAt: desc }) {
          edges {
            node {
              ...BlogPostPreview_post
              id
            }
          }
        }
      }
    `,
    viewer
  );

  return (
    <div>
      <h1>Blog posts</h1>
      <ul>
        {data.allBlogPosts?.edges?.map((e: any) => (
          <BlogPostPreview key={e?.node.id} post={e?.node!} />
        ))}
      </ul>
    </div>
  );
};
