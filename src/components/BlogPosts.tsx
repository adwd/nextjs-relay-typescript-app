import { graphql } from "react-relay";
import { usePaginationFragment } from "react-relay/hooks";
import { BlogPosts_Viewer$key } from "../lib/__generated__/BlogPosts_Viewer.graphql";
import { BlogPostPreview } from "./BlogPostPreview";

type Props = {
  blogPosts: BlogPosts_Viewer$key;
};

export const BlogPosts = ({ blogPosts }: Props) => {
  const { data, loadNext, loadPrevious, hasNext, hasPrevious } = usePaginationFragment(
    graphql`
      fragment BlogPosts_Viewer on Viewer @refetchable(queryName: "BlogPostsPaginationQuery") {
        allBlogPosts(orderBy: $orderBy, first: $first, after: $after)
          @connection(key: "BlogQuery_viewer_allBlogPosts") {
          edges {
            node {
              ...BlogPostPreview_post
              id
            }
          }
        }
      }
    `,
    blogPosts
  );

  return (
    <div>
      <h1>Blog posts</h1>
      <ul>
        {data.allBlogPosts.edges?.map((e: any) => (
          <BlogPostPreview key={e?.node.id} post={e?.node!} />
        ))}
      </ul>
      <div>
        {hasPrevious ? <button onClick={() => loadPrevious(10)}>previous</button> : null}
        {hasNext ? <button onClick={() => loadNext(10)}>next</button> : null}
      </div>
    </div>
  );
};
