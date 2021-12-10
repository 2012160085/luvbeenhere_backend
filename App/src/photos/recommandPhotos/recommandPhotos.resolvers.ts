import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";
import axios from "axios"
import FormData from "form-data";
import zlib from 'zlib';
const resolvers: Resolvers = {
    Mutation: {
        recommandPhotos: protectedResolver(
            async (_, { images }, { loggedInUser, client }) => {

                const threadhold = 0.88
                const sliceLength = 4;

                if (!loggedInUser) {
                    return {
                        ok: false
                    }
                }
                const formData = new FormData();
                const filenames = []
                const readStreams = await Promise.all(images)
                const zlibs = readStreams.map((e) => e['createReadStream']().pipe(zlib.createGzip()))
                readStreams.map(
                    (e, i) => {
                        filenames.push(e['filename'])
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
                        ok: false,
                        error: 'clustering fail'
                    }
                } else {
                    const cluster = [[filenames[0]]]

                    JSON.parse(resp.data['body']).map((e, i) => {
                        if (e >= threadhold) {
                            cluster[cluster.length - 1].push(filenames[i + 1])
                        } else {
                            cluster.push([filenames[i + 1]])
                        }
                    })

                    console.log(cluster);


                    const filenames_sliced = []
                    for (var i = 0; i < Math.ceil(filenames.length / sliceLength); i++) {
                        filenames_sliced.push(filenames.slice(i * sliceLength, i * sliceLength + sliceLength))
                    }
                    console.log(filenames_sliced);


                    const rcmdResp = (data) => axios.post(
                        "https://bxsd7ugitl.execute-api.ap-northeast-2.amazonaws.com/default/photo-clustering",
                        data
                        ,
                        {
                            headers: {
                                'Content-Type': formData.getHeaders()['content-type']
                            },
                        }
                    );


                    filenames_sliced.map(
                        (_filenames) => {
                            const _formData = new FormData()
                            
                        }
                    )
                    return {
                        ok: true
                    }
                }

            })
    }
}

export default resolvers;