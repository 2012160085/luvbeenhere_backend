import client from "../../client";
import { uploadPhoto } from "../../shared/shared.utils";


export const createPhoto = async (files, posX, posY, datetime, visitId) => {
    const uploadPromises = files.map(file => uploadPhoto(file, visitId))
    const locations = (await Promise.all(uploadPromises)).map(upload => upload['Location'])
    const photos = locations.map(location => {
        return client.photo.create({
            data: {
                datetime,
                file: location,
                posX,
                posY,
                visitId
            }
        })
    })
    await Promise.all(photos)

};