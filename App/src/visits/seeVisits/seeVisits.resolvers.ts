import { Resolvers } from "../../types";

const resolvers: Resolvers = {
    Query: {
        seeDates: async (_, { xRngFrom, xRngTo, yRngFrom, yRngTo, }, { client }) => {

            await client.visit.findMany({
                where: {
                    photos : {
                        
                    }
                }
            });
            return {
                ok: true
            }
        }
    }
}

export default resolvers;