import { gql } from "apollo-server-express";

export default gql`
    type Card{
        id:               Int!     
        date:             Date!   
        representingDate: Date    
        title:            String!
        desc:             String
        file:             String!
        locateX:          Float!
        locateY:          Float!
        place:            Place!   
    }
`