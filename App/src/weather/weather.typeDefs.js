import { gql } from "apollo-server-express";

export default gql`
    type Weather{
        id: Int!            
        weatherStationId: Int!
        rainy: Int
        prcpt15m: Int
        prcpt60m: Int
        prcpt3h: Int
        prcpt6h: Int
        prcpt12h: Int
        prcpt24h: Int
        temp: Float
        windSpeed1h: Float
        windSpeed10h: Float
        humidity: Int
        pressure: Float
        observedAt: DateTime!
    }
    
`