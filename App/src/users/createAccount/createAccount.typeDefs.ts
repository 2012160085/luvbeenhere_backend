import { gql } from "apollo-server";

export default gql`
  type Mutation {
    createAccount(
      name: String!
      username: String!
      phone: String!
      password: String!
      auth: String!
    ): MutationResponse!
  }
`;
