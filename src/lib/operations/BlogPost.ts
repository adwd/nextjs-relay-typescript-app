import { graphql } from "react-relay";

export const blogPostQuery = graphql`
  query BlogPostQuery($id: String!) {
    viewer {
      BlogPost(id: $id) {
        ...BlogPost_post
      }
    }
  }
`;
