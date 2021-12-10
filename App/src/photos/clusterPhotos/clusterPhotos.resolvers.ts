import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";
import axios from "axios"
import FormData from "form-data";
const resolvers: Resolvers = {
    Mutation: {
        clusterPhotos: protectedResolver(
            async (_, { images }, { loggedInUser, client }) => {
                const threadhold = 0.88
                if (!loggedInUser) {
                    return {
                        ok: false
                    }
                }
                const formData = new FormData();
                const filenmaes = []
                const readStreams = await Promise.all(images)

                readStreams.map(
                    (e, i) => {
                        filenmaes.push(e['filename'])
                        formData.append(`file${i + 1}`, e['createReadStream']())
                    }
                )



                const resp = await axios.post(
                    "https://bxsd7ugitl.execute-api.ap-northeast-2.amazonaws.com/default/photo-clustering",
                    formData
                    ,
                    {
                        headers: {
                            'Content-Type': formData.getHeaders()['content-type']
                        },
                    }
                );
                if (resp.data['statusCode'] === '200') {
                    return {
                        ok: false
                    }
                } else {
                    const cluster = [[filenmaes[0]]]

                    
                    JSON.parse(resp.data['body']).map((e, i) => {
                        if (e >= threadhold) {
                            cluster[cluster.length - 1].push(filenmaes[i + 1])
                        } else {
                            cluster.push([filenmaes[i + 1]])
                        }
                    })
                    return {
                        ok: true,
                        cluster
                    }
                }

            })
    }
}

export default resolvers;