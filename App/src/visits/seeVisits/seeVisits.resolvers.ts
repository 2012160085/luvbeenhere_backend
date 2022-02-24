import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
    Query: {
        seeVisits: protectedResolver(
            async (_, { xRngFrom, xRngTo, yRngFrom, yRngTo, }, { client ,loggedInUser}) => {
                if (!loggedInUser){
                    return []
                }
                
                const visits = await client.visit.findMany({
                    where: {
                        AND: {
                            posX: {
                                gte: xRngFrom,
                                lte: xRngTo,
                            },
                            posY: {
                                gte: yRngFrom,
                                lte: yRngTo,
                            },
                            date:{
                                coupleId: loggedInUser.coupleId
                            }
                        }
                    },
                    include: {
                        rating: true,
                        weather: true
                    }
                });

                return visits
            }
        )
    }
}

export default resolvers;