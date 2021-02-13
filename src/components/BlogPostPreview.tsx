import { graphql } from "react-relay";
import { useFragment } from "react-relay/hooks";
import { BlogPostPreview_post$key } from "../lib/__generated__/BlogPostPreview_post.graphql";

type Props = {
  post: BlogPostPreview_post$key;
};

export const BlogPostPreview = ({ post }: Props) => {
  const data = useFragment(
    graphql`
      fragment BlogPostPreview_post on BlogPost {
        id
        title
      }
    `,
    post
  );
  return <li>{data.title}</li>;
};
