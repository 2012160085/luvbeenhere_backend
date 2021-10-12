import { gql } from "apollo-server";

export default gql`
  type Mutation {
    verifyPhone(
      phone: String!
      auth: String!
    ): LoginResult!
  }
`;
