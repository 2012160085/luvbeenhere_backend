import { Resolvers } from "../types";
import client from "../client";

const resolvers: Resolvers = {
    Visit: {
        photos: async ({ id }) => {
            return client.photo.findMany({
                where: {
                    visit: {
                        id,
                    }
                }
            })
        },
        date: async ({ id }) => {
            return client.mDate.findFirst({
                where: {
                    visits: {
                        some: {
                            id,
                        }
                    }
                }
            })
        }
    }
}

export default resolvers;