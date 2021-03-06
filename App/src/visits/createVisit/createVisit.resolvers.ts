import {
  averageInArr,
  date2StrDay,
  minmaxDateInArr,
  uploadPhoto,
} from "../../shared/shared.utils";
import { Resolvers } from "../../types";
import AWS from "aws-sdk";
import { protectedResolver } from "../../users/users.utils";
import { seeWeather } from "../../weather/seeWeather/seeWeather";
import { reverseGeocodeDataToString, reverseGeocoding } from "../../shared/reverseGeocoding";
const resolvers: Resolvers = {
  Mutation: {
    createVisit: protectedResolver(
      async (
        _,
        {
          name,
          placeId,
          photoPosts,
          rating,
          comment,
          datetime,
          advantage,
          shortage,
          price,
          isPublic,
        },
        { client, loggedInUser }
      ) => {

        const photoInfo = photoPosts.map((photoPost) => {
          photoPost["datetime"] = new Date(photoPost["datetime"]);
          return { ...photoPost };
        });

        const minmaxDate = minmaxDateInArr(
          photoInfo.map((pi) => pi["datetime"])
        );
        console.log(minmaxDate);

        const strDateDay = date2StrDay(minmaxDate[0], "day");
        const avgPosX = averageInArr(photoInfo.map((pi) => pi["posX"]));
        const avgPosY = averageInArr(photoInfo.map((pi) => pi["posY"]));
        console.log(strDateDay);
        //데이트 없으면 생성

        var date = await client.mDate.findUnique({
          where: {
            datetime_coupleId: {
              datetime: new Date(strDateDay).toISOString(),
              coupleId: loggedInUser.coupleId,
            },
          },
        });

        if (!date) {
          date = await client.mDate.create({
            data: {
              datetime: new Date(strDateDay).toISOString(),
              name: `${strDateDay} 데이트`,
              couple: {
                connect: {
                  id: loggedInUser.coupleId,
                },
              },
            },
          });
        }

        //방문 생성
        const address = reverseGeocodeDataToString((await reverseGeocoding(avgPosX, avgPosY)).data) ;

        const createdVisit = await client.visit.create({
          data: {
            name: name ? name : `${address} 방문`,
            date: {
              connect: {
                id: date.id,
              },
            },
            photos: {
              createMany: {
                data: photoInfo,
              },
            },
            datetime: date2StrDay(minmaxDate[0], "hour"),
            advantage,
            comment,
            isPublic,
            ...(rating && {
              rating: {
                create: {
                  value: rating,
                },
              },
            }),
            posX: avgPosX,
            posY: avgPosY,
            price,
            shortage,
            rgeocode: address,
          },
        });
        const weather = await seeWeather(avgPosX, avgPosY, date2StrDay(minmaxDate[0], "hour"));
        if (weather.exists) {
          await client.visit.update({
            where: {
              id: createdVisit.id
            },
            data: {
              weatherId: weather.raw.id
            }
          })
        }
        return {
          ok: true,
          visitId: createdVisit.id,
          dateId: createdVisit.dateId,
        };
      }
    ),
  },
};

export default resolvers;
