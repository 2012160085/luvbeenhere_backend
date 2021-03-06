import { gql } from "apollo-server-express";

export default gql`
    type Place{
        id: Int!
        name: String!
        posX: Float!
        posY: Float!
        visits: [Visit]
    }
`