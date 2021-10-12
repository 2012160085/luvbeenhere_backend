
import bcrypt from "bcrypt";
import { Resolvers } from "../../types";
import { protectedResolver } from "../users.utils";

const resolvers: Resolvers = {
  Mutation: {
    handleInvitation: protectedResolver(async (
      _,
      { accept, invitationId },
      { client, loggedInUser }
    ) => {
      try {
        const existingInviation = await client.coupleInvitation.findUnique({
          where: {
            id: invitationId
          },
          include: {
            receiver: true,
            sender: true
          }
        })
        if (!existingInviation) {
          return {
            ok: false,
            error: "20004"
          }
        }
        else if (existingInviation.receiverId != loggedInUser.id) {
          return {
            ok: false,
            error: "20005"
          }
        }
        if (accept) {
          await client.coupleInvitation.deleteMany({
            where: {
              receiver: {
                id: loggedInUser.id
              }
            }
          })
        } else {
          await client.coupleInvitation.delete({
            where: {
              id: existingInviation.id
            }
          })
        }
        await client.couple.create({
          data: {
            name: `${existingInviation.sender.name.substring(1)}&${existingInviation.receiver.name.substring(1)}`,
            user: {
              connect: [
                {
                  id: existingInviation.receiverId
                },
                {
                  id: existingInviation.senderId
                }
              ]
            }
          }
        })
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