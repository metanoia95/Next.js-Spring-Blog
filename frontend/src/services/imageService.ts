'use server'

import { fileApi } from "../lib/axios";


export async function uploadImage(
    data: FormData
): Promise<string> {

    const res = await fileApi.post('/api/image', data)
    return res.data
}