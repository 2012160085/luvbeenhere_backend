
import bcrypt from "bcrypt";
import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    createAccount: async (
      _,
      { name, username, phone, password },
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
          throw new Error("This username is already taken");
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
          error: "Cant Create account",
        };
      }
    },
  },
};
export default resolvers;