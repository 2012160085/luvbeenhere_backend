
import fs from "fs";
import bcrypt from "bcrypt";
import { protectedResolver } from "../users.utils";
import { Resolvers } from "../../types";
import { uploadPhoto } from "../../shared/shared.utils";

const resolvers: Resolvers = {
    Mutation: {
        editProfile: protectedResolver(
            async (
                _, { name, username, phone, password, avatar }, { loggedInUser, client }
            ) => {
                let avatarUrl = null;
                if (avatar) {
                    uploadPhoto(avatar, loggedInUser.id);
                }

                let hashedPassword = null;
                if (password) {
                    hashedPassword = await bcrypt.hash(password, 11);
                }

                const updatedUser = await client.user.update({
                    where: {
                        id: loggedInUser.id,
                    },
                    data: {
                        name,
                        phone,
                        ...(hashedPassword && { password: hashedPassword }),
                        ...(avatarUrl && { avatar: avatarUrl }),
                    },
                });
                if (updatedUser.id) {
                    return {
                        ok: true,
                    };
                } else {
                    return {
                        ok: false,
                        error: "Cloud not update profile",
                    };
                }
            }
        ),
    },
};

export default resolvers;