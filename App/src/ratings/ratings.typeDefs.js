import { gql } from "apollo-server-express";

export default gql`
    type Rating{
        id: Int!    
        value: Int!
        visit: Visit!
    }
`