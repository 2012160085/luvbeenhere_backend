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

  type Couple {
    id: String!
    createdAt: String!
    updatedAt: String!
    user: [User]
    date: [MDate]
  }

  type CoupleInvitation {
    id: String!
    sender: User
    receiver: User
    createdAt: String!
    updatedAt: String!
    senderId: Int!
    receiverId: Int!
  }
`;
