
import bcrypt from "bcrypt";
import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    createAccount: async (
      _,
      { username, name, phone, password, auth },
      { client }
    ) => {
      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                username,
              },
              {
                phone,
              },
            ],
          },
        });
        if (existingUser) {
          return {
            ok: false,
            error: "10101"
          }
        }
        const verification = await client.phoneVerification.findFirst({
          where: {
            phone
          },
          orderBy: {
            createdAt: 'desc'
          }
        });
        if (verification.token !== auth || !verification.verfied) {
          return {
            ok: false,
            error: "10102"
          }
        }
        const hashedPassword = await bcrypt.hash(password, 11);
        await client.user.create({
          data: {
            username,
            phone,
            name,
            password: hashedPassword,
          },
        });
        return {
          ok: true,
        };
      } catch (e) {
        return {
          ok: false,
          error: "10103",
        };
      }
    },
  },
};
export default resolvers;