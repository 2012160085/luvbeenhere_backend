import { gql } from "apollo-server-express";

export default gql`
    type Rating{
        id: Int!    
        place: Place!
        date: Date!
        rate: Int!
    }
`