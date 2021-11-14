import axios from "axios";

export const reverseGeocoding = async (posX, posY) => {
  const resp = await axios.get(
    "https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc",
    {
      headers: {
        "X-NCP-APIGW-API-KEY-ID": process.env.X_NCP_APIGW_API_KEY_ID,
        "X-NCP-APIGW-API-KEY": process.env.X_NCP_APIGW_API_KEY,
      },
      params: {
        coords: `${posY},${posX}`,
        sourcecrs: "epsg:4326",
        output: "json",
        request: "coordsToaddr",
        orders: "addr",
      },
    }
  );
  var area1 = resp.data.results[0].region.area1.name;
  const area2 = resp.data.results[0].region.area2.name;
  const area3 = resp.data.results[0].region.area3.name;
  
  area1 = area1 === "서울특별시" ? "" : `${area1} `;

  return `${area1}${area2} ${area3}`;
};
