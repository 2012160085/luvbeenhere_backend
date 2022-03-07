import { gql } from "apollo-server-express";

export default gql`
  type SearchVisitsResponse {
    ok: Boolean!
    error: String
    visits: [Visit]
  }
  type Query {
    searchVisits(
        query: String
        weather: String
        area1: String
        area2: [String]
        sorting: String
        ts: String
    ): SearchVisitsResponse!
  }
`;
