import { averageInArr, date2StrDay, minmaxDateInArr, uploadPhoto } from "../../shared/shared.utils";
import { Resolvers } from "../../types";
import AWS from 'aws-sdk'
import { protectedResolver } from "../../users/users.utils";
const resolvers: Resolvers = {
    Mutation: {
        createRating: protectedResolver
            (async (_, {
                visitId,
                value
            }, { client, loggedInUser }) => {
                const visitToRate = await client.visit.findUnique({
                    where: {
                        id: visitId
                    },
                    include: {
                        date: true
                    }
                });
                if(!visitToRate){
                    return{
                        ok : false,
                        error : "30001"
                    }
                }
                
                if (visitToRate.date.coupleId != loggedInUser.coupleId) {
                    return {
                        ok: false,
                        error: "30000"
                    }
                }
                await client.rating.upsert({
                    where: {
                        visitId
                    },
                    create: {
                        value,
                        visit: {
                            connect: {
                                id: visitId
                            }
                        }
                    },
                    update: {
                        value
                    }
                })
                return {
                    ok: true
                }
            })
    }
}

export default resolvers;