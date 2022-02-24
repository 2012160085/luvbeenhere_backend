import axios from "axios";
export type reverseGeocodeData = {
  area0: string,
  area1: string,
  area2: string,
  area3: string,
  area4: string,
}
export type reverseGeocodingResult = {
  data?: reverseGeocodeData
  ok: boolean
}

type reverseGeocoding = (lat: number, lng: number) => Promise<reverseGeocodingResult>
type reverseGeocodeDataToString = (rgeoCodeData: reverseGeocodeData) => string
export const reverseGeocoding: reverseGeocoding = async (lat, lng) => {
  console.log(1);
  try {
    const resp = await axios.get(
      "https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc",
      {
        headers: {
          "X-NCP-APIGW-API-KEY-ID": process.env.X_NCP_APIGW_API_KEY_ID,
          "X-NCP-APIGW-API-KEY": process.env.X_NCP_APIGW_API_KEY,
        },
        params: {
          coords: `${lng},${lat}`,
          sourcecrs: "epsg:4326",
          output: "json",
          request: "coordsToaddr",
          orders: "addr",
        },
      }
    );
    if (resp.status == 200) {
      return {
        data: {
          area0: resp.data['results'][0]['region']['area0']['name'],
          area1: resp.data['results'][0]['region']['area1']['name'],
          area2: resp.data['results'][0]['region']['area2']['name'],
          area3: resp.data['results'][0]['region']['area3']['name'],
          area4: resp.data['results'][0]['region']['area4']['name'],
        },
        ok: true
      }
    } else {
      return {
        ok: false
      }
    }
  } catch (e) {
    console.log(e);

  }
  return {
    ok: false
  }


};
export const reverseGeocodeDataToString: reverseGeocodeDataToString = (rgeoCodeData: reverseGeocodeData ) => {
  if (rgeoCodeData.area0 !== "kr") {
    return '외국'
  } else {
    const area1 = rgeoCodeData.area1
    const doeMapping = {
      경기도: '경기',
      강원도: '강원',
      충청북도: '충북',
      충청남도: '충남',
      전라북도: '전남',
      경상북도: '경북',
      경상남도: '경남'
    }
    
    var a1Text = ''
    if (area1.endsWith("특별시")) {
      a1Text = area1.slice(0, a1Text.length - 3)
    } else if (area1.endsWith("광역시")) {
      a1Text = area1.slice(0, a1Text.length - 3)
    } else if (area1.endsWith("특별자치도")) {
      a1Text = area1.slice(0, a1Text.length - 5)
    } else if (area1.endsWith("특별자치시")) {
      a1Text = area1.slice(0, a1Text.length - 5)
    } else {
      a1Text = doeMapping[`${area1}`]
    }
  }
  return `${a1Text} ${rgeoCodeData.area2} ${rgeoCodeData.area3}`
}