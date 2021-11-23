import { Resolvers } from "../../types";

const resolvers: Resolvers = {
    Query: {
        seeDates: async (_, { skip, take }, { loggedInUser, client }) => {
            if (loggedInUser) {
                return await client.mDate.findMany({
                    include: {
                        couple: true,
                        visits: true
                    },
                    where: {
                        coupleId: loggedInUser.coupleId
                    },
                    orderBy: {
                        datetime: "desc"
                    },
                    skip,
                    take
                })
            } else {
                return []
            }

        }

    }
}
export default resolvers;