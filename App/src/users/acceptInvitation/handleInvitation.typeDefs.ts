import { gql } from "apollo-server";

export default gql`
  type Mutation {
    handleInvitation(
      invitationId: Int!
      accept: Boolean!
    ): MutationResponse!
  }
`;
