import { gql } from "apollo-server-express";

export default gql`
    type Place{
        id: Int!    
        cards: [Card]
        ratings: [Rating]
    }
`