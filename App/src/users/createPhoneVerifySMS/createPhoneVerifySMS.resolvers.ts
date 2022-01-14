
import bcrypt from "bcrypt";
import client from "../../client";
import { Resolvers } from "../../types";
import { protectedResolver } from "../users.utils";
import CryptoJS from "crypto-js"
import axios from "axios";
const resolvers: Resolvers = {
  Mutation: {
    createPhoneVerifySMS: async (
      _,
      { phone }
    ) => {

      const mock = true;

      const existingUser = await client.user.findUnique({
        where: {
          phone
        }
      })
      console.log(existingUser);
      
      if (existingUser) {
        return {
          ok: false,
          error: "10101"
        }
      }


      const randint = () => `${Math.floor(Math.random() * 10)}`
      const auth = mock ? "123456" : Array.from(Array(6).keys()).map(e => randint()).reduce((x, y) => x + y);
      const token = CryptoJS.SHA256((Math.random() * new Date().getTime()).toString()).toString();
      await client.phoneVerification.create({
        data: {
          auth,
          phone,
          token
        }
      })

      var space = " ";
      var newLine = "\n";
      var method = "POST";
      var url = `https://sens.apigw.ntruss.com/sms/v2/services/${process.env.NAVER_API_SMS_API_KEY}/messages`;
      var url_rel = `/sms/v2/services/${process.env.NAVER_API_SMS_API_KEY}/messages`;
      var timestamp = `${new Date().getTime()}`;
      var accessKey = process.env.NAVER_API_ACCESS_KEY_ID;
      var secretKey = process.env.NAVER_API_SECRET_KEY;

      var hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
      hmac.update(method);
      hmac.update(space);
      hmac.update(url_rel);
      hmac.update(newLine);
      hmac.update(timestamp);
      hmac.update(newLine);
      hmac.update(accessKey);

      var hash = hmac.finalize();
      const signingKey = hash.toString(CryptoJS.enc.Base64)


      if (mock) {
        console.log(auth);

      } else {
        var smsResp = await axios({
          url,
          method: 'post',
          data: {
            type: "SMS",
            from: process.env.NAVER_API_SMS_SENT_NUMBER,
            content: `[luvbeenhere] 인증번호 [${auth}]를 입력해주세요.`,
            messages: [
              {
                to: phone
              }
            ]
          },
          headers: {
            'x-ncp-apigw-timestamp': timestamp,
            'x-ncp-iam-access-key': accessKey,
            'x-ncp-apigw-signature-v2': signingKey,
            'Content-Type': 'application/json;charset=utf-8'
          }
        })
      }


      return {
        ok: true
      }

    }
  }
}
export default resolvers;