import { uploadPhoto } from "../../shared/shared.utils";
import { Resolvers } from "../../types";

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
            if (files) {
                files.forEach(element => {
                    const upload = uploadPhoto(element, "enms")
                    console.log(upload);
                });
            }
            await client.visit.create({
                data: {
                    name,
                    date: {
                        connect: {
                            id: dateId
                        }
                    },
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
            return {
                ok: true
            }
        }
    }
}

export default resolvers;