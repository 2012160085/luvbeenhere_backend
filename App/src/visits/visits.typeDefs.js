import { gql } from "apollo-server-express";

export default gql`
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
    }

    input PhotoPost{
        file: Upload!
        posX: Float
        posY: Float
        comment: String
        datetime: String
    }
`