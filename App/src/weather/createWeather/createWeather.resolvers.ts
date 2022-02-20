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
                const stationIdSelect = await client.weatherStation.findMany({
                    select: {
                        id: true
                    }
                })
                const stationIds = stationIdSelect.map((e) => e.id)
                const IncomingIds = weatherInputs.map((e) => e.weatherStationId)
                
                const nonExsitingIds = IncomingIds.filter(id => !(stationIds.includes(id)))
                console.log(nonExsitingIds);
                if (nonExsitingIds.length > 0){
                    await client.weatherStation.createMany({
                        data: nonExsitingIds.map((e)=>{
                            return{
                                id: e,
                                name: '임시이름',
                                altitude: 0,
                                address: '임시 주소',
                                latitude: 0,
                                longitude: 0
                            }
                        })
                    })
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