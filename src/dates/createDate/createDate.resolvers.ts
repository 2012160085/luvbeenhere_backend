import { Resolvers } from "../../types";

const resolvers: Resolvers = {
    Mutation: {
        createData: () => {
            return {
                ok: true
            }
        }
    }
}