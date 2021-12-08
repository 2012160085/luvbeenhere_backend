import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";
import axios from "axios"
const resolvers: Resolvers = {
    Mutation: {
        clusterPhotos: protectedResolver(
            async (_, { images }, { loggedInUser, client }) => {
                if (!loggedInUser) {
                    return {
                        ok: false
                    }
                }
                const formData = new FormData();
                images.map((e,i)=> formData.append(`file${i+1}`,e))

                const resp = await axios.post(
                    "https://bxsd7ugitl.execute-api.ap-northeast-2.amazonaws.com/default/photo-clustering",
                    formData
                    ,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                    }
                );
                console.log(resp);
                
                return {
                    ok: true,
                    cluster: ['a', 'b']
                }
            })
    }
}

export default resolvers;