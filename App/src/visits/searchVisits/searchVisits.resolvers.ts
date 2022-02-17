import axios from "axios";
import { Resolvers } from "../../types";

const priorityTypes = ['closest', 'popular', 'latest']
const resolvers: Resolvers = {
    Query: {
        searchVisits: async (_, { query, location, locationScale, priority }, { client }) => {
            if (priority) {
                if (!(priority in priorityTypes)) {
                    return {
                        ok: false,
                        error: "priority must be one of: 'closest', 'popular', 'latest'"
                    }
                }
            }
            const searchBody = {
                "query": {
                    "function_score": {
                        "query": query ? {
                            "bool": {
                                "should": [
                                    {
                                        "match": {
                                            "comment": query
                                        }
                                    },
                                    {
                                        "match": {
                                            "visitname": query
                                        }
                                    }
                                ]
                            }
                        } : {
                            "match_all": {}
                        },
                        "functions": [

                        ],
                        "score_mode": "multiply",
                        "boost_mode": "multiply",
                        "min_score": 0.5
                    }
                }
            }
            const likesParam = {
                "field_value_factor": {
                    "field": "likes",
                    "factor": 1.2,
                    "modifier": "ln2p",
                    "missing": 0
                },
                "weight": 0.3
            }
            if (location) {
                const locationParam = {
                    "linear": {
                        "location": {
                            "origin": location,
                            "scale": `${locationScale * 2}km`,
                            "offset": `${locationScale}m`,
                            "decay": 0.5
                        }
                    },
                    "weight": 1
                }
                searchBody.query.function_score.functions.push(
                    locationParam, likesParam
                )
            }

            console.log(JSON.stringify(searchBody));

            const result = await axios.post(
                "http://localhost:9200/test5-2022.02.13/_search",
                JSON.stringify(searchBody),
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
