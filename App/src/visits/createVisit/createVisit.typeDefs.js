import { gql } from "apollo-server-express";

export default gql`
  type CreateVisitResponse {
    ok: Boolean!
    error: String
    visitId: Int
    dateId: Int
  }
  type Mutation {
    createVisit(
      name: String!
      placeId: Int
      photoPosts: [PhotoPost]!
      rating: Int
      comment: String
      advantage: String
      shortage: String
      price: Int
      isPublic: Boolean
      datetime: String
    ): CreateVisitResponse!
  }
`;
