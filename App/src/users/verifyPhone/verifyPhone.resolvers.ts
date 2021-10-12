
import bcrypt from "bcrypt";
import client from "../../client";
import { Resolvers } from "../../types";
import { protectedResolver } from "../users.utils";
import CryptoJS from "crypto-js"
import axios from "axios";
const resolvers: Resolvers = {
  Mutation: {
    verifyPhone: async (
      _,
      { phone, auth }
    ) => {

      const verifyRequest = await client.phoneVerification.findFirst({
        where: {
          phone,
        },
        orderBy: {
          createdAt: 'desc'
        }
      });
      if (!verifyRequest) {
        return {
          ok: false,
          error: "10003"
        }
      }

      const timeDelta = new Date().getTime() - new Date(verifyRequest.createdAt).getTime()
      console.log(timeDelta);

      if (timeDelta <= 180 * 1000) {
        if (auth !== verifyRequest.auth) {
          return {
            ok: false,
            error: "10005"
          }
        }
        if (verifyRequest.verfied) {
          return {
            ok: false,
            error: "10006"
          }
        }
        await client.phoneVerification.update({
          data: {
            verfied: true
          },
          where: {
            id: verifyRequest.id
          }
        })
        console.log("good");

        return {
          ok: true,
          token: verifyRequest.token
        }
      } else {
        return {
          ok: false,
          error: "10004"
        }
      }
    }
  }
}
export default resolvers;