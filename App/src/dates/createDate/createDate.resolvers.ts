import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
    Mutation: {
        createDate: protectedResolver(
            async (_, { name, datetime }, { loggedInUser, client }) => {
                if(!loggedInUser.coupleId){
                    return {
                        ok: false,
                        error: "10001"
                    }
                }
                await client.mDate.create({
                    data: {
                        name,
                        couple: {
                            connect: {
                                id: loggedInUser.coupleId
                            }
                        },
                        datetime
                    }
                });
                return {
                    ok: true
                }
            })
    }
}

export default resolvers;