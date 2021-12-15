import { gql } from "apollo-server-express";

export default gql `
    type recommandPhotosResponse{
        scores: [Float]
        error: String
        ok: Boolean!
    }
    type Mutation{
        recommandPhotos(images: [Upload]!): recommandPhotosResponse!
    }
`