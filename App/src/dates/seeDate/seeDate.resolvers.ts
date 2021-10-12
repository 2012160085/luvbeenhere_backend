import { Resolvers } from "../../types";

const resolvers: Resolvers = {
    Query: {
        seeDate: async (_, {id}, { client }) => 
            client.mDate.findUnique({
                where:{
                    id
                },
                include:{
                    visits: {
                        include:{
                            rating: true,
                            photos: true,
                        }
                    },
                    tag: true,
                    weatherTag: true,
                    couple: true
                }
            })
    }
}
export default resolvers;