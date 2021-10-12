import { gql } from "apollo-server-express";

export default gql`
  type MDate {
    id: Int!
    name: String!
    datetime: String!
    visits: [Visit]
    couple: Couple!
    posX: Float
    posY: Float
    tag: [Tag]
    weatherTag: [WeatherTag]
    price: Int
  }

  type Tag {
    id: Int!
    name: String!
  }
  type WeatherTag {
    id: Int!
    name: String!
  }
`;
