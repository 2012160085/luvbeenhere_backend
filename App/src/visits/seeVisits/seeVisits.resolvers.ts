import { Resolvers } from "../../types";

const resolvers: Resolvers = {
    Query: {
        seeVisits: async (_, { xRngFrom, xRngTo, yRngFrom, yRngTo, }, { client }) => {
            console.log(xRngTo);
            
            const visits = await client.visit.findMany({
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
                },
                include:{
                    rating: true
                }
            });
            console.log(visits);
            
            return visits
        }
    }
}

export default resolvers;