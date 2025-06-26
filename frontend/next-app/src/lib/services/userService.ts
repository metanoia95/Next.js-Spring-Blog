import api from "../axios"

export interface UserInfo {
    email: string
    name : string
    status_msg : string;
    profile_img : string;
}

export async function getUserInfo():Promise<UserInfo> {

    const response = await api.get('/api/user/userinfo')

    return response.data
}

