
type tempScoreScript = "Math.min(params.s0+params.ds,Math.max(params.s0,params.s0 + (doc['temp'].value - params.t0)*(params.ds/params.dt)))"
type rainyScoreScript = "Math.min(doc['prcpt60m'].size() > 0 ? doc['prcpt60m'].value : 0,params.bound)/params.bound"
type esQuery = {
    query: {
        function_score: {
            query: {
                bool?: {
                    should?: {
                        match: {
                            comment?: string
                            visitname?: string
                        }
                    }[],
                    must?: {
                        match?: {
                            area1: string
                        },
                        terms?: {
                            area2: string[]
                        }
                    }[]
                }
                ,
                match_all?: {}
            },
            functions:
            {
                script_score?: {
                    "script": {
                        "params": {
                            "s0"?: number,
                            "ds"?: number,
                            "t0"?: number,
                            "dt"?: number,
                            "bound"?: number
                        },
                        "source": tempScoreScript | rainyScoreScript
                    }
                },
                field_value_factor?: {
                    "field": "likes",
                    "factor": number,
                    "modifier": "ln2p" | "ln1p",
                    "missing": 0
                },
                exp?: {
                    datetime: {
                        origin: string,
                        scale: string
                    }
                },
                gauss?: {
                    datetime: {
                        origin: string,
                        scale: string
                    }
                }
                weight?: number
            }[],
            score_mode?: "avg" | "first" | "max" | "min" | "multiply" | "sum",
            boost_mode?: "avg" | "first" | "max" | "min" | "multiply" | "sum"
        }
    }
}

type FilterQueryBuilder = (
    weather?: "rainy" | "cold" | "hot",
    area1?: string,
    area2?: string[],
    query?: string,
    sorting?: 'closest' | 'popular' | 'latest'
) => esQuery;



export const buildFilterQuery: FilterQueryBuilder = (weather, area1, area2, query, sorting) => {
    const esQuery: esQuery = {
        query: {
            function_score: {
                query: {},
                functions: []
            }
        }
    }
    if (query) {
        if (!esQuery.query.function_score.query.bool) {
            esQuery.query.function_score.query.bool = {}
        }
        esQuery.query.function_score.query.bool.should = [
            {
                match: {
                    comment: query
                }
            }
        ]
    }

    if (area1) {
        if (!esQuery.query.function_score.query.bool) {
            esQuery.query.function_score.query.bool = {}
        }
        if (!esQuery.query.function_score.query.bool.must) {
            esQuery.query.function_score.query.bool.must = []
        }
        esQuery.query.function_score.query.bool.must.push({
            match: {
                area1
            }
        })
    }
    if (area2) {
        if (!esQuery.query.function_score.query.bool) {
            esQuery.query.function_score.query.bool = {}
        }
        if (!esQuery.query.function_score.query.bool.must) {
            esQuery.query.function_score.query.bool.must = []
        }
        esQuery.query.function_score.query.bool.must.push({
            terms: {
                area2
            }
        })
    }
    if (weather) {
        if (weather !== 'rainy') {
            var dt = weather === "cold" ? -15.001 : 15.001
            esQuery.query.function_score.functions.push({
                script_score: {
                    script: {
                        params: {
                            s0: 0.0,
                            ds: 1.001,
                            t0: 15.001,
                            dt
                        },
                        source: "Math.min(params.s0+params.ds,Math.max(params.s0,params.s0 + (doc['temp'].value - params.t0)*(params.ds/params.dt)))"
                    }
                }
            })
        } else {
            esQuery.query.function_score.functions.push({
                script_score: {
                    script: {
                        params: {
                            bound: 85.0
                        },
                        source: "Math.min(doc['prcpt60m'].size() > 0 ? doc['prcpt60m'].value : 0,params.bound)/params.bound"
                    }
                }
            })
        }
        if (sorting) {
            if (sorting === "latest") {
                esQuery.query.function_score.functions.push({
                    gauss: {
                        datetime: {
                            origin: "2022-01-24T14:30:20.000Z",
                            scale: "4000h"
                        }
                    }
                })
                esQuery.query.function_score.functions.push({
                    field_value_factor: {
                        field: "likes",
                        factor: 1.2,
                        modifier: "ln2p",
                        missing: 0
                    },
                })
            }
            if (sorting === "popular") {
                esQuery.query.function_score.functions.push({
                    field_value_factor: {
                        field: "likes",
                        factor: 1.2,
                        modifier: "ln1p",
                        missing: 0
                    },
                })
                esQuery.query.function_score.functions.push({
                    exp: {
                        datetime: {
                            origin: "2022-01-24T14:30:20.000Z",
                            scale: "8760h"
                        }
                    }
                })
            }
        }
    }
    if (Object.keys(esQuery.query.function_score.query).length === 0) {
        esQuery.query.function_score.query = {
            match_all: {}
        }
    }
    esQuery.query.function_score.boost_mode = "multiply"
    esQuery.query.function_score.score_mode = "multiply"
    return esQuery
}