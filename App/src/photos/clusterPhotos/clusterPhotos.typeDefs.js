import { gql } from "apollo-server-express";

export default gql `
    type clusterPhotosResponse{
        cluster: [[String]]
        ok: Boolean!
        error: String
    }
    type Mutation{
        clusterPhotos(images: [Upload]!): clusterPhotosResponse!
    }
`