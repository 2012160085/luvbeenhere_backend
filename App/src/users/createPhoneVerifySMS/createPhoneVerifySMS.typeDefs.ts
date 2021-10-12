import { gql } from "apollo-server";

export default gql`
  type Mutation {
    createPhoneVerifySMS(
      phone: String!
    ): MutationResponse!
  }
`;
