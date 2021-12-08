import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";
import { uploadPhoto } from "../../shared/shared.utils"
const resolvers: Resolvers = {
    Mutation: {
        uploadSinglePhoto: protectedResolver(
            async (_, { upload }, { loggedInUser, client }) => {
                if (!loggedInUser) {
                    return {
                        ok: false
                    }
                }
                const uploaded = await uploadPhoto(upload);

                return {
                    ok: true,
                    file: uploaded["Location"]
                }
            })
    }
}

export default resolvers;