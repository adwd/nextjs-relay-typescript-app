import { graphql } from "react-relay";
import { useFragment } from "react-relay/hooks";
import { BlogPost_post$key } from "../lib/__generated__/BlogPost_post.graphql";

type Props = {
  post: BlogPost_post$key;
};

export const BlogPost = ({ post }: Props) => {
  const data = useFragment(
    graphql`
      fragment BlogPost_post on BlogPost {
        id
        title
        content
        createdAt
        updatedAt
      }
    `,
    post
  );
  return (
    <div>
      <h1>{data.title}</h1>
      <p>created: {data.createdAt}</p>
      <p>updated: {data.updatedAt}</p>
      <p>{data.content}</p>
    </div>
  );
};
