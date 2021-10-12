import { gql } from "apollo-server";

export default gql`
  type Mutation {
    createInvitation(
      receiver: String!
    ): MutationResponse!
  }
`;
