import { gql } from "apollo-server-express";

export default gql`
    type AddrResponse{
        result: String!
    }
    type Query{
        getAddress(posX: Float!, posY: Float!) : AddrResponse!
    }
`