import { AxiosResponse } from "axios";
import { fileApi } from "../lib/axios";


export async function uploadImage(
    data: FormData
): Promise<AxiosResponse> {

    return await fileApi.post('/api/image', data)
}