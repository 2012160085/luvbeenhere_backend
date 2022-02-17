import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
    Mutation: {
        createWeather:
            async (_, { weatherInputs, token }, { client }) => {
                if (process.env.WEATHER_UPDATE_TOKEN !== token) {
                    return {
                        ok: false
                    }
                }
                await client.weather.createMany({
                    data: weatherInputs
                })
                return {
                    ok: true
                }
            }
    }
}

export default resolvers;