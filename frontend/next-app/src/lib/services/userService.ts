import {jsonApi} from "../axios"

export interface UserInfo {
    id:number;
    email: string
    name : string
    status_msg : string;
    profile_img : string;
}

export async function getUserInfo():Promise<UserInfo> {    
    const response = await jsonApi.get('/api/user/userinfo')

    return response.data
}

