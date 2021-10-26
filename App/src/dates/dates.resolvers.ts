import { Resolvers } from "../types";

const resolvers: Resolvers = {
  MDate: {
    isMine: async ({ couple }, _, { client, loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      if (!loggedInUser.coupleId) {
        return false;
      }
      return couple.id === loggedInUser.coupleId;
    },
  },
};

export default resolvers;
