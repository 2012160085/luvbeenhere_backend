require("dotenv").config();
import http from 'http';
import express, { application } from "express";
import logger from "morgan";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import client from "./client";
import { getUser } from "./users/users.utils";
import { graphqlUploadExpress } from 'graphql-upload'
const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    uploads: false,
    context: async ({ req }) => {
        return {
            loggedInUser: await getUser(req.headers.token),
            client,
        };

    },
    subscriptions: {
        onConnect: async (param) => {
            if (!param['token']) {
                throw new Error("No token")
            }
            const loggedInUser = await getUser(param['token'])
            return {
                loggedInUser
            }
        }
    }
});

const PORT = process.env.PORT;
const app = express();

app.use(logger("common"))
app.use(graphqlUploadExpress());
apollo.applyMiddleware({ app });
app.use("/static", express.static("uploads"));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});