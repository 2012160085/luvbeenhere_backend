import { gql } from "apollo-server-express";

export default gql `
    type uploadPhotosResponse{
        filenames: [String]
        ok: Boolean!
    }
    type Mutation{
        uploadPhotos(uploads: [Upload]!): uploadPhotosResponse!
    }
`