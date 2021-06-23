import { gql } from "apollo-server-express";

export default gql`
    type Mutation{
        createDate(cards: Int): MutationResponse!
    }
`