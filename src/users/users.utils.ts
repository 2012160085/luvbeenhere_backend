import * as jwt from "jsonwebtoken";
import client from "../client";
import { ProtectedResolver, Resolver, Resolvers } from "../types";
export const getUser = async (token) => {
  try {
    if (!token) {
      return null;
    }
    const verifiedToken: any = await jwt.verify(token, process.env.PRIVATE_KEY);
    if ("id" in verifiedToken) {
      const user = await client.user.findUnique({ where: { id: verifiedToken["id"] } });
      if (user) {
        return user;
      }
    }
    const user = await client.user.findUnique({ where: { id: verifiedToken["id"] } });

    if (user) {
      return user;
    } else {
      return null;
    }
  } catch {
    return null;
  }
};
export const protectedResolver: ProtectedResolver = (resolver) => (root, args, context, info) => {
  if (!context.loggedInUser) {
    const query = info.operation.operation === "query";
    if (query) {
      return null;
    } else {
      return {
        ok: false,
        error: "Please log in to perform this action.",
      };
    }
  }
  console.log(context.loggedInUser);
  return resolver(root, args, context, info);
};

export const checkUserExists = async (username) => {
  return client.user.findUnique({
    where: { username },
    select: { id: true },
  });

}