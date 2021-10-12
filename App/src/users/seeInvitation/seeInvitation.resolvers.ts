
import bcrypt from "bcrypt";
import { Resolvers } from "../../types";
import { protectedResolver } from "../users.utils";

const resolvers: Resolvers = {
  Query: {
    seeInvitation: protectedResolver(async (
      _,
      {limit },
      { client, loggedInUser }
    ) => {
      return await client.coupleInvitation.findMany({
        where: {
          receiver: {
            id: loggedInUser.id
          }
        },
        include:{
          sender: true
        }
      })
    })
  },
};
export default resolvers;