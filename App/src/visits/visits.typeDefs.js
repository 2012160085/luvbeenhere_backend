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
    }

    input PhotoPost{
        file: String!
        posX: Float
        posY: Float
        comment: String
        datetime: String
    }
`