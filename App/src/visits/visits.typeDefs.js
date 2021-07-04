import { gql } from "apollo-server-express";

export default gql`
    type Visit{
        id: Int!
        name: String!
        date: Date!
        place: Place
        photos: [Photo]
        rating: Rating
    }
`