require("dotenv").config();
import http from 'http';
import express from "express";
import logger from "morgan";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import client from "./client";
import { getUser } from "./users/users.utils";

const apollo = new ApolloServer({
    typeDefs,
    resolvers,
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
apollo.applyMiddleware({ app });
app.use("/static", express.static("uploads"));

const httpServer = http.createServer(app);
apollo.installSubscriptionHandlers(httpServer);


httpServer.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});