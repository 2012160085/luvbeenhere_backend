import { gql } from "apollo-server-express";

export default gql`
    type Query{
        weatherTest(lat:Float!,lng:Float!,datetime: String!): String!
    }
`