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
        location: String
        locationScale: Float
        priority: String
    ): SearchVisitsResponse!
  }
`;
