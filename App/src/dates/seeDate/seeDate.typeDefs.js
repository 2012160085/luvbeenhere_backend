import { gql } from "apollo-server-express";

export default gql`
    type Query{
        seeDate(id: Int!): MDate!
    }
`