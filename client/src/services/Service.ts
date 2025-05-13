import { API_HOST } from "@/consts"
import axios, { type AxiosInstance, type AxiosResponse } from "axios"

export class Service<T> {
    instance: AxiosInstance

    constructor(url?: string) {
        this.instance = axios.create({
            baseURL: url ? API_HOST + url : API_HOST,
            headers: {
                "Content-Type": "application/json",
            },
        })
    }
    
    async GET<K extends T>(url: string): Promise<AxiosResponse<K>> {
        return await this.instance.get<K>(url)
    }

    async POST<K extends T>(data: Partial<K>, url?: string): Promise<AxiosResponse<K>> {
        return await this.instance.post<K>(url || "", data)
    }

    async PUT<K extends T>(data: Partial<K>, url?: string): Promise<AxiosResponse<K>> {
        return await this.instance.put<K>(url || "", data)
    }

    async PATCH<K extends T>(data: Partial<K>, url?: string): Promise<AxiosResponse<K>> {
        return await this.instance.patch<K>(url || "", data)
    }

    async DELETE<K extends T>(url?: string): Promise<AxiosResponse<K>> {
        return await this.instance.delete<K>(url || "")
    }
}
