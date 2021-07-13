/* eslint-disable no-dupe-keys */
import { HMTracking } from '../model/HMTracking';
import axios, { AxiosInstance } from 'axios';
import { ProductHM } from '../model/ProductHM';

export class HMController {
  protected serviceURL: string;
  protected basePath: string;
  public client: AxiosInstance;

  public constructor(serviceURL: string, basePath: string) {
    this.serviceURL = serviceURL;
    this.basePath = basePath;
    this.client = axios;
  }
  getTrackingByOrderNo(params: { orderNo: string }): Promise<HMTracking> {
    if (params.orderNo.length < 10) {
      return Promise.reject(new HMTracking());
    }
    return this.client
      .get(
        `${this.serviceURL}/checkpoints/?orderNo=${params.orderNo}&user=1613945&lang=en`,
      )
      .then((res) => {
        const data = res.data;
        data.header = data.header[0];
        data.body = Object.values(data.body);
        if (data.body && data.body[0] && data.body[0][0]) {
          data.body = data.body[0].reverse();
        }
        return data;
      });
  }
  getInfoProduct = (link: string): Promise<ProductHM> => {
    // fetch(
    //     "https://consumer.truefitcorp.com/profile/public/v1/hms/products?s=0685816&locale=en_GB",
    //     {
    //         credentials: "include",
    //         headers: {
    //             "User-Agent":
    //                 "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:89.0) Gecko/20100101 Firefox/89.0",
    //             Accept: "*/*",
    //             "Accept-Language": "en-US,en;q=0.5",
    //             "Content-Type": "application/json",
    //             "X-TF-UserToken": "lr744c3s8d3kt6081n8uqcrqsq",
    //             "Proxy-Authorization":
    //                 "Basic dXNlci11dWlkLTBmOTVmM2NiNWYxNTMzZmFmMTE0NTg2NGI4YjQxZGFjOmQ1NzM4ZmZjYWQzZQ==",

    //             Origin: "https://www2.hm.com",
    //             Connection: "keep-alive",
    //             Referer: "https://www2.hm.com/",
    //             Cookie: "tfcuser=lr744c3s8d3kt6081n8uqcrqsq; prod1-tf-prod-86479863pn=05",
    //             TE: "Trailers",
    //         },
    //         referrer: "https://www2.hm.com/",
    //         method: "GET",
    //     }
    // ).then((res) => {
    //     console.log(res);
    // });
    return this.client
      .get(
        `https://photorankapi-a.akamaihd.net/customers/218508/streams/bytag/${link}/?version=v2.2&auth_token=920865547897d325cbff11865b9a87af5957e27267b69ab3cbab86a8782dda1d`,
      )
      .then((res) => {
        return res.data.data;
      });
  };
}
