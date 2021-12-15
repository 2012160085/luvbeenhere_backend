import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";
import axios from "axios";
import FormData from "form-data";

const resolvers: Resolvers = {
  Mutation: {
    recommandPhotos: protectedResolver(
      async (_, { images }, { loggedInUser, client }) => {
        const sliceLength = 3;
        if (!loggedInUser) {
          return {
            ok: false,
          };
        }
        const formDatas = []
        const filenames = [];
        const readStreams = await Promise.all(images);

        readStreams.map((e, i) => {
          filenames.push(e["filename"]);
          if (i % sliceLength === 0) {
            formDatas.push(new FormData());
          }
          formDatas[formDatas.length - 1].append(`file${i % sliceLength + 1}`, e["createReadStream"]());
        });
        formDatas.map((formData) => {
          const formDataFnAdded = formData["_streams"].map((stream, i) => {
            if (typeof stream === "string") {
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
        }
        )

        const makeRequest = (formData) => axios.post(
          "https://8dxj8sge5b.execute-api.ap-northeast-2.amazonaws.com/default/photo-score",
          formData,
          {
            headers: {
              "Content-Type": formData.getHeaders()["content-type"],
            },
          }
        );

        const responses = await Promise.all(formDatas.map((formData) => makeRequest(formData)))

        const ok = responses.map((response) => response.status === 200).reduce((a, b) => a && b)
        const scores = !ok ? null : responses.map(
          (response) => Object.keys(response.data).sort().map(
            (key) => response.data[key]
          )
        ).reduce((a, b) => a.concat(b))
        return {
          ok,
          scores
        }

      }
    ),
  },
};

export default resolvers;
