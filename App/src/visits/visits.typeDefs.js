import { gql } from "apollo-server-express";

export default gql `
    type Visit{
        id: Int!
        name: String!
        date: MDate!
        place: Place
        photos: [Photo]
        rating: Rating
        posX: Float
        posY: Float
        comment: String!
        rgeocode: String
        likeCount: Int!
        weather: Weather
        datetime: String!
        area1: String
        area2: String
        area3: String
        area4: String
    }

    input PhotoPost{
        file: String!
        posX: Float
        posY: Float
        comment: String
        datetime: String
    }
`