import { Resolvers } from "../types";
import { reverseGeocoding } from "./reverseGeocoding";

const resolvers: Resolvers = {
  Query: {
    getAddress: async (_, { posX, posY }, { loggedInUser }) => {
      if (!loggedInUser) {
        return {
          result: "",
        };
      } else {
        const result = await reverseGeocoding(posX, posY);
        return {
          result: result,
        };
      }
    },
  },
};
export default resolvers;
