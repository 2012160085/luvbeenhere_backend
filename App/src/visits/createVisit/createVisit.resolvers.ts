import { createPhoto } from "../../photos/createPhoto/createPhoto";
import { uploadPhoto } from "../../shared/shared.utils";
import { Resolvers } from "../../types";
import AWS from 'aws-sdk'
const resolvers: Resolvers = {
    Mutation: {
        createVisit: async (_, { name, dateId, placeId, files, rating }, { client }) => {
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
            const createdVisit = await client.visit.create({
                data: {
                    name,
                    date: {
                        connect: {
                            id: dateId
                        }
                    },
                    posX: 37.3,
                    posY: 127.32,
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
                }
            });
            if (files) {
                await createPhoto(files, 37.23, 127.33, new Date().toISOString(), createdVisit.id);
            }
            return {
                ok: true
            }
        }
    }
}

export default resolvers;