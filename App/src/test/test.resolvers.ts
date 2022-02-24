
import { reverseGeocodeDataToString, reverseGeocoding } from "../shared/reverseGeocoding";
import { Resolvers } from "../types";
import { seeWeather } from "../weather/seeWeather/seeWeather";

const resolvers: Resolvers = {
    Query: {
        weatherTest: async (_, { lat, lng, datetime }, { client }) => {

            const res = await seeWeather(lat, lng, datetime);
            console.log(res);

            return "test"
        },
        rgoTest: async (_, { lat, lng }, { client }) => {

            const res = await reverseGeocoding(lat, lng);
            console.log(res);

            return reverseGeocodeDataToString(res.data)
        },


    },
    Mutation: {
        weatherUpdate: async (_, __, { client }) => {

            const visits = await client.visit.findMany({
                where: {
                    weather: null
                }
            })
            const weathersPromise = visits.map((v) => seeWeather(v.posX, v.posY, v.datetime.toISOString()))
            const weathers = await Promise.all(weathersPromise)
            console.log(weathers);

            const updates = visits.map((v, i) => {
                if (weathers[i].exists) {
                    return client.visit.update({
                        where: {
                            id: v.id,
                        },
                        data: {
                            weatherId: weathers[i].raw.id
                        }
                    })
                } else {
                    return new Promise(() => 0)
                }
            })

            const result = await Promise.all(updates)
            console.log(result.length);

            return "test"
        },

    }
}
export default resolvers;