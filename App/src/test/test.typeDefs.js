import { gql } from "apollo-server-express";

export default gql `
    type Mutation{
        test(uploads: [Upload]!): String
    }
`