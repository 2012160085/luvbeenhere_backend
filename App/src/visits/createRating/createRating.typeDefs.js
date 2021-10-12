import { gql } from "apollo-server-express";

export default gql`
    type Mutation{
        createRating(
            visitId: Int!
            value: Int!
        ): MutationResponse!
    }
`;
