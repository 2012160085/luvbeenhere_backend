import { gql } from "apollo-server-express";

export default gql `
    type Query{
        seeDates(skip: Int!, take:Int!): [MDate]!
    }
`