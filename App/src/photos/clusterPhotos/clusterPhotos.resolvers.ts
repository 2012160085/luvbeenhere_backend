import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";
import axios from "axios";
import FormData from "form-data";

const resolvers: Resolvers = {
  Mutation: {
    clusterPhotos: protectedResolver(
      async (_, { images }, { loggedInUser, client }) => {
        const threadhold = 0.88;
        const sliceLength = 4;

        if (!loggedInUser) {
          return {
            ok: false,
          };
        }
        const formData = new FormData();
        const filenames = [];
        const readStreams = await Promise.all(images);

        readStreams.map((e, i) => {
          filenames.push(e["filename"]);
          formData.append(`file${i + 1}`, e["createReadStream"]());
        });

        const formDataFnAdded = formData["_streams"].map((stream, i) => {
          if (typeof stream === "string") {
            console.log(stream);

            if (!stream.includes("filename")) {
              stream = stream.replace(
                "form-data;",
                `form-data; filename="${i}.tmp";`
              );
            }
          }
          return stream;
        });
        formData["_streams"] = formDataFnAdded;
        const resp = await axios.post(
          "https://bxsd7ugitl.execute-api.ap-northeast-2.amazonaws.com/default/photo-clustering",
          formData,
          {
            headers: {
              "Content-Type": formData.getHeaders()["content-type"],
            },
          }
        );
        const apiSuccess = resp.data["statusCode"] === 200;
        if (!apiSuccess) {
          return {
            ok: false,
            error: "api failed",
          };
        } else {
          const cluster = [[filenames[0]]];

          JSON.parse(resp.data["body"]).map((e, i) => {
            if (e >= threadhold) {
              cluster[cluster.length - 1].push(filenames[i + 1]);
            } else {
              cluster.push([filenames[i + 1]]);
            }
          });
          return {
            ok: true,
            cluster,
          };
        }
      }
    ),
  },
};

export default resolvers;
