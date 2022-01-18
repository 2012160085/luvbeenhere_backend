import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";
import { uploadPhoto } from "../../shared/shared.utils"
import axios from "axios";
const resolvers: Resolvers = {
    Mutation: {
        uploadPhotos: protectedResolver(
            async (_, { uploads }, { loggedInUser, client }) => {
                if (!loggedInUser) {
                    return {
                        ok: false
                    }
                }
                const readStreams = await Promise.all(uploads);
                try {
                    const requests = readStreams.map(
                        (stream) => axios({
                            method: "post",
                            url: "https://s3uenjbv14.execute-api.ap-northeast-2.amazonaws.com/default/photo-upload",
                            data: stream["createReadStream"](),
                            headers: {
                                "Content-Type": stream["mimetype"],
                            },
                        })
                    )
                    const results = await Promise.all(requests)
                    const filenames = results.map(
                        (result) => result.data["body"]
                    )
                    return {
                        ok: true,
                        filenames
                    }
                } catch (err) {
                    return {
                        ok: false
                    }
                }
            })
    }
}

export default resolvers;