import type { PlainObject } from "@/model/base";
import type { CommonResponse } from "@/model/xhr";
import { requestParamsFilter } from "@/utils/helper";
import axios from "axios";
import { useCookies } from "vue3-cookies";
import { mapGetters } from 'vuex';
// import VueCookies from 'vue-cookies';


const api = axios.create({
  baseURL: "http://207.148.89.111:3001/api/v1/",
  timeout: 20000,
});

// const tokenGetter = mapGetters({
//   getToken: 'auth/getToken'
// });

api.defaults.headers.common["Content-Type"] =
  "application/x-www-form-urlencoded";
api.interceptors.request.use((config) => {
  // const token = VueCookies.VueCookies.get('token')
  // console.log(token + "mong là sẽ có");
  // if (token) {
  //   // Nếu user đã đăng nhập, thiết lập header Authorization
  //   config.headers.Authorization = `Bearer ${token}`;
  // }
  return config;
});

export class ApiClient {
  private feature: string;

  constructor(feature: string) {
    this.feature = feature;
  }
  
  // get
  protected $get<T extends CommonResponse>(
    action: string,
    params: PlainObject = {},
    config: PlainObject = {}
  ): Promise<T> {
    return api.get(`/${this.feature}/${action}`, {
      ...config,
      params: requestParamsFilter(params, true),
    });
  }

  //post
  protected $post<T extends CommonResponse>(
    action: string,
    body: Object,
    config: PlainObject = {}
  ): Promise<T> {
    console.log(body);
    return api.post(`/${this.feature}/${action}`, body, {
      ...config,
    });
  }

  protected $delete<T extends CommonResponse>(
    action: string,
    params: PlainObject = {},
    config: PlainObject = {}
  ): Promise<T> {
    return api.delete(`/${this.feature}/${action}`, {
      ...config,
      params: requestParamsFilter(params, true),
    });
  }

  protected $put<T extends CommonResponse>(
    action: string,
    body: Object,
    config: PlainObject = {}
  ): Promise<T> {
    console.log(body);
    return api.put(`/${this.feature}/${action}`, body, {
      ...config,
    });
  }
}