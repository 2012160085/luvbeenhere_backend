import axios from "axios";
import { Resolvers } from "../../types";
import { buildFilterQuery } from "./querys/esQuery";

type priorityTypes = 'closest' | 'popular' | 'latest'

const resolvers: Resolvers = {
    Query: {
        searchVisits: async (_, { query, weather, area1, area2, sorting }, { client }) => {
            const fq = buildFilterQuery(weather, area1, area2, query, sorting);
            console.log(JSON.stringify(fq));

            const result = await axios.post(
                "http://localhost:9200/test7-2022.02.24/_search",
                JSON.stringify(fq),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            console.log(result);
            if (result.status != 200) {
                return {
                    ok: false,
                    error: "unknown error"
                }
            }
            const data = result.data
            console.log(JSON.stringify(data['hits']['hits']));

            const visitIds: number[] = data['hits']['hits'].map(
                ({ _source }) => _source['id']
            )
            console.log(visitIds);
            const visits = await client.visit.findMany({
                where: {
                    id: {
                        in: visitIds
                    }
                },
                include: {
                    weather: true
                }
            })

            visits.sort((a, b) => visitIds.indexOf(a.id) - visitIds.indexOf(b.id))
            return {
                ok: true,
                visits
            }
        }
    }
}

export default resolvers;
