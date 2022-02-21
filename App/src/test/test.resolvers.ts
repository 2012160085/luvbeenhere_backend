import { Resolvers } from "../types";
import { seeWeather } from "../weather/seeWeather/seeWeather";

const resolvers: Resolvers = {
    Query: {
        weatherTest: async (_, {lat,lng, datetime }, { client }) => {

            const a = await seeWeather(lat, lng, datetime);
            return "test"
        }

    }
}
export default resolvers;