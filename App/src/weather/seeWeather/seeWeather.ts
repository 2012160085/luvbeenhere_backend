import { Weather } from "@prisma/client";
import e from "express";
import client from "../../client";

export type seeWeather = (lat: number, lng: number, observedAt: string) => Promise<weatherBrief>;
export type temperature = 'burnning' | 'hot' | 'warm' | 'cool' | 'cold' | 'freezing'

export type weatherBrief = {
    temperature?: temperature;
    windy?: Boolean;
    rainy?: Boolean;
    snowy?: Boolean;
    raw?: Weather;
    exists: Boolean;
};

const getTemperature = (temp) => {
    if (temp >= 30) {
        return 'burnning'
    } else if (temp >= 24) {
        return 'hot'
    } else if (temp >= 17) {
        return 'warm'
    } else if (temp >= 12) {
        return 'cool'
    } else if (temp >= 5) {
        return 'cold'
    } else {
        return 'freezing'
    }
}

export const seeWeather: seeWeather = async (lat, lng, observedAt) => {
    const weathers = await client.weather.findMany({
        where: {
            AND: {
                observedAt,
                temp: {
                    not: null
                },
                station: {
                    AND: {
                        latitude: {
                            gt: lat - 0.1,
                            lt: lat + 0.1
                        },
                        longitude: {
                            gt: lng - 0.1,
                            lt: lng + 0.1
                        },
                        altitude: {
                            lt: 700
                        }
                    }
                }
            }
        },
        include: {
            station: true
        }
    })
    if (weathers.length < 0) {
        return {
            exists: false
        }
    }
    const weatherWithDist = weathers.map(e => {
        return {
            ...e,
            dist: Math.pow((e.station.latitude - lat) * 100, 2) + Math.pow((e.station.longitude - lng) * 100, 2),
        }
    }
    )
    const nearestWeather = weatherWithDist.sort((a, b) => a.dist - b.dist)[0]

    return {
        rainy: nearestWeather.prcpt3h && nearestWeather.prcpt3h > 1 && nearestWeather.temp > 2,
        snowy: nearestWeather.prcpt3h && nearestWeather.prcpt3h > 1 && nearestWeather.temp <= 4,
        temperature: getTemperature(nearestWeather.temp),
        windy: nearestWeather.windSpeed1h && nearestWeather.windSpeed1h > 5.5,
        raw: nearestWeather,
        exists: true
    }
}
