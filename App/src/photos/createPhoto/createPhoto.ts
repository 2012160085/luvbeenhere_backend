import client from "../../client";
import { uploadPhoto } from "../../shared/shared.utils";


export const createPhoto = async (files, posXs, posYs, datetime, visitId) => {
    const uploadPromises = files.map(file => uploadPhoto(file, visitId))
    const photoInfos = (await Promise.all(uploadPromises)).map((upload,idx) => [upload["Location"],posXs[idx],posYs[idx]])

    const photos = photoInfos.map(element => {
        return client.photo.create({
            data: {
                datetime,
                file: element[0],
                posX: element[1],
                posY: element[2],
                visitId
            }
        })
    })
    await Promise.all(photos)

};