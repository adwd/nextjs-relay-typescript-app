import { createFragmentContainer, graphql } from "react-relay";
import { BlogPosts_viewer } from "../lib/__generated__/BlogPosts_viewer.graphql";
import BlogPostPreview from "./BlogPostPreview";

const BlogPosts = ({ viewer }: { viewer: BlogPosts_viewer }) => (
  <div>
    <h1>Blog posts</h1>
    <ul>
      {viewer.allBlogPosts?.edges?.map((e) => (
        <BlogPostPreview key={e?.node.id} post={e?.node!} />
      ))}
    </ul>
  </div>
);

export default createFragmentContainer(BlogPosts, {
  viewer: graphql`
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
});
