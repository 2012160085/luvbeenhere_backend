import { gql } from "apollo-server";

export default gql`
  type User {
    id: String!
    name: String!
    username: String!
    phone: String!
    avatar: String
    createdAt: String!
    updatedAt: String!
  }
`;
