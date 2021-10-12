import { gql } from "apollo-server";

export default gql`
  type Mutation {
    editProfile(
      name: String
      phone: String
      password: String
      avatar: Upload,
      coupleId: Int
    ): MutationResponse!
  }
`;
