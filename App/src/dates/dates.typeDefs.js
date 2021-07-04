import { gql } from "apollo-server-express";

export default gql`
    type Date{
        id: Int!
        name: String!
        yyyymmdd: String!
        visits: [Visit]
    }
`