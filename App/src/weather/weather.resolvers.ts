import { Resolvers } from "../types";
import client from "../client";
import { getTemperature } from "./seeWeather/seeWeather";

const resolvers: Resolvers = {
    Weather: {
        brief: async ({ id,prcpt3h,temp,windSpeed1h }) => {
            return {
                rainy: prcpt3h !== null && prcpt3h > 1 && temp > 2,
                snowy: prcpt3h !== null && prcpt3h > 1 && temp <= 4,
                temperature: getTemperature(temp),
                windy: windSpeed1h !== null && windSpeed1h > 5.5,
            }
        }
    }
}

export default resolvers;