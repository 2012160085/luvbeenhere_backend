import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
    Query: {
        seeLastestWeather:
            async (_, { token }, { client }) => {
                if (process.env.WEATHER_UPDATE_TOKEN !== token) {
                    return {
                        ok: false,
                        error: 'token is not correct'
                    }
                }
                const result = await client.$queryRaw(
                    'select max("observedAt") as latest from "Weather" w'
                )
                const {latest} = result[0]   
                return {
                    ok: true,
                    latest
                }
            }
    }
}

export default resolvers;