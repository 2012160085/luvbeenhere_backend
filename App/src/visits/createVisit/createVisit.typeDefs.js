import { gql } from "apollo-server-express";

export default gql`
    type Mutation{
        createVisit(
            name: String!,
            dateId: Int!,
            placeId: Int,
            files: [Upload]!
            posXs: [Float]!
            posYs: [Float]!
            rating: Int,
            comment: String!
        ): MutationResponse!
    }
`