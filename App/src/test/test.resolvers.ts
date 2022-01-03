import { Resolvers } from "../types";
import AWS from "aws-sdk";

const s3Cred = new AWS.Credentials(process.env.AWS_KEY, process.env.AWS_SECRET);
AWS.config.credentials = s3Cred;

const resolvers: Resolvers = {
  Mutation: {
    test: async (_, { uploads }, { loggedInUser, client }) => {
      console.log("test");
      const files = await Promise.all(uploads);
      console.log("file done");
      const uploadPromises = files.map((file) =>
        new AWS.S3()
          .upload({
            Body: file["createReadStream"](),
            Bucket: "luvbeenhere-images",
            Key: file["filename"],
            ACL: "public-read",
          })
          .promise()
      );
      console.log("test");
      const result = await Promise.all(uploadPromises);
      console.log(result);
      return "success";
    },
  },
};
export default resolvers;
