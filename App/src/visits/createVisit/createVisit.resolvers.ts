import { createPhoto } from "../../photos/createPhoto/createPhoto";
import { uploadPhoto } from "../../shared/shared.utils";
import { Resolvers } from "../../types";
import AWS from 'aws-sdk'
const resolvers: Resolvers = {
    Mutation: {
        createVisit: async (_, { name, dateId, placeId, files, rating, posXs, posYs, comment }, { client }) => {
            const date = await client.date.findUnique({ where: { id: dateId } })
            if (!date) {
                return {
                    ok: false,
                    error: 'date does not exists',
                }
            }

            if (placeId) {
                const place = await client.place.findUnique({ where: { id: placeId } })
                if (!place) {
                    return {
                        ok: false,
                        error: 'place does not exists',
                    }
                }
            }
            const average = arr => arr.reduce((p, c) => p + c, 0) / arr.length;

            const createdVisit = await client.visit.create({
                data: {
                    name,
                    date: {
                        connect: {
                            id: dateId
                        }
                    },
                    posX: average(posXs),
                    posY: average(posYs),
                    ...(placeId && {
                        place: {
                            connect: {
                                id: placeId,
                            }
                        }
                    }),
                    ...(rating && {
                        rating: {
                            create: {
                                rating,
                            }
                        }
                    }),
                    comment,
                }
            });
            if (files) {
                await createPhoto(files, posXs, posYs, new Date().toISOString(), createdVisit.id);
            }
            return {
                ok: true
            }
        }
    }
}

export default resolvers;