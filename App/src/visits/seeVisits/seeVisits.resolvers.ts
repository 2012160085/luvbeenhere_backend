import { Resolvers } from "../../types";

const resolvers: Resolvers = {
    Query: {
        seeVisits: async (_, { xRngFrom, xRngTo, yRngFrom, yRngTo, }, { client }) => {
            return client.visit.findMany({
                where: {
                    AND: {
                        posX:{
                            gte:xRngFrom,
                            lte:xRngTo,
                        },
                        posY:{
                            gte:yRngFrom,
                            lte:yRngTo,
                        }
                    }
                }
            });
        }
    }
}

export default resolvers;