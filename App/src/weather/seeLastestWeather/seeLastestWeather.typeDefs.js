import { gql } from "apollo-server-express";

export default gql`
    type seeLastestWeatherResponse{
        ok: Boolean!
        error: String
        latest: String
    }
    type Query{
        seeLastestWeather(token: String!): seeLastestWeatherResponse!
    }
`