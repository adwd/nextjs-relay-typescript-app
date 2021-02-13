import { graphql } from "react-relay";

export const blogPostIdsQuery = graphql`
  query BlogPostIdsQuery($first: Int!) {
    viewer {
      allBlogPosts(first: $first) {
        edges {
          node {
            id
          }
        }
      }
    }
  }
`;
