import { gql } from "apollo-server-express";

export default gql `
    type uploadSinglePhotoResponse{
        file: String
        ok: Boolean!
    }
    type Mutation{
        uploadSinglePhoto(upload: Upload!): uploadSinglePhotoResponse!
    }
`