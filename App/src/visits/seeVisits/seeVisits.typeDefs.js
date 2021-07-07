import { gql } from "apollo-server-express";

export default gql `
    type Query{
        seeVisits(xRngFrom:Float,xRngTo:Float,yRngFrom:Float, yRngTo:Float): [Visit]
    }
`