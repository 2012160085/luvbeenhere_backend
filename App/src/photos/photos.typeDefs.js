import { gql } from "apollo-server-express";

export default gql`
    type Photo{
        id: Int!
        posX: Float!
        posY: Float!
        file: String
        datetime: String
        visit: Visit!
    }
`