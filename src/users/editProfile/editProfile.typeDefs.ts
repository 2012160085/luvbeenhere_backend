import { gql } from "apollo-server";

export default gql`
  type Mutation {
    editProfile(
      name: String
      username: String
      phone: String
      password: String
      avatar: Upload
    ): MutationResponse!
  }
`;
