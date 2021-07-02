import { gql } from "apollo-server-express";

export default gql`
    type Date{
        id: Int!    
        mainCard: Card   
        cards : [Card]
        title: String!     
        desc: String      
        ratings: [Rating]
        testparam: Int!
    }
`