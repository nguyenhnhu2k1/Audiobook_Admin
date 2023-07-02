import type { UserRecord, UserResponse} from "../model/user/user";
import { ApiClient } from ".";
import type { LoginRequest, editInfoRequest } from "@/model/user/request";
import { useCookies } from 'vue3-cookies'

class AuthService extends ApiClient {
  //gửi dữ liệu đăng nhập, nhận thông tin trả về
  public login(data: LoginRequest) {
    return this.$post<UserResponse<UserRecord>>('signin', data); 
  }
  public getProfile(){
    const {cookies} = useCookies()
    const token = cookies.get('token')
    return this.$get<UserResponse<UserRecord>>('profile', {}, {
      headers:{
        Authorization: `Bearer ${token}` // Đính kèm token trong header Authorization
      }
    })
  }

//   gửi dữ liệu chỉnh sửa thông tin cá nhân, nhận thông tin trả về
  public editInfo(data: editInfoRequest){
    const { cookies } = useCookies()
    const token = cookies.get('token')
    return this.$post<UserResponse<UserRecord>>('update', data, {
      headers: {
        Authorization: `Bearer ${token}` // Đính kèm token trong header Authorization
      }
    })
  }

  public getUserByID(data: userByIDRequest) {
    const { cookies } = useCookies();
    const token = cookies.get('token');
    return this.$get<UserResponse<UserRecord>>(data.id, data,
        {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

}

export const authService = new AuthService("user");