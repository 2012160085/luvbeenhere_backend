import { gql } from "apollo-server-express";

export default gql `
    type clusterPhotosResponse{
        cluster: [[String]]
        ok: Boolean!
    }
    type Mutation{
        clusterPhotos(images: [Upload]!): clusterPhotosResponse!
    }
`