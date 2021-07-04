import { Resolvers } from "../../types";

const resolvers: Resolvers = {
    Mutation: {
        createDate: async (_, { name, yyyymmdd }, { client }) => {
            await client.date.create({
                data: {
                    name,
                    yyyymmdd,
                }
            });
            return {
                ok: true
            }
        }
    }
}

export default resolvers;