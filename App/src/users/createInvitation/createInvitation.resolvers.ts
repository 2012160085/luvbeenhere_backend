
import bcrypt from "bcrypt";
import { Resolvers } from "../../types";
import { protectedResolver } from "../users.utils";

const resolvers: Resolvers = {
  Mutation: {
    createInvitation: protectedResolver(async (
      _,
      { receiver },
      { client, loggedInUser }
    ) => {
      try {
        const receiverUser = await client.user.findFirst({
          where: {
            OR: [
              {
                username: receiver,
              },
              {
                phone: receiver,
              },
            ],
          },
        });
        if (!receiverUser) {
          return {
            ok: false,
            error: "10002"
          }
        }
        const existingInviation = await client.coupleInvitation.findUnique({
          where: {
            senderId_receiverId : {
              receiverId: receiverUser.id,
              senderId: loggedInUser.id
            }
          }
        })
        if(existingInviation){
          return {
            ok: false,
            error: "20003"
          }
        }
        await client.coupleInvitation.create({
          data: {
            receiver: {
              connect: {
                id: receiverUser.id
              }
            },
            sender: {
              connect: {
                id: loggedInUser.id
              }
            }
          }
        });
        return {
          ok: true,
        };
      } catch (e) {
        return {
          ok: false,
          error: "20101",
        };
      }
    })
  },
};
export default resolvers;