'use server'
import { AxiosResponse } from "axios";
import { fileApi } from "../lib/axios";


export async function uploadImage(
    data: FormData
): Promise<AxiosResponse> {

    const res = await fileApi.post('/api/image', data)

    return res.data
}