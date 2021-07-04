import { gql } from "apollo-server-express";

export default gql`
    type Mutation{
        createDate(name: String!, yyyymmdd:String!): MutationResponse!
    }
`