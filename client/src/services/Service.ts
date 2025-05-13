import axios, { type AxiosInstance, type AxiosResponse } from "axios"

export class Service<T> {
    instance: AxiosInstance

    constructor() {
        this.instance = axios.create({
            baseURL: "http://localhost:8000/api",
            headers: {
                "Content-Type": "application/json",
            },
        })
    }
    
    async GET<K extends T>(url: string): Promise<AxiosResponse<K>> {
        return await this.instance.get<K>(url)
    }

    async POST<K extends T>(url: string, data: K): Promise<AxiosResponse<K>> {
        return await this.instance.post<K>(url, data)
    }

    async PUT<K extends T>(url: string, data: K): Promise<AxiosResponse<K>> {
        return await this.instance.put<K>(url, data)
    }

    async PATCH<K extends T>(url: string, data: K): Promise<AxiosResponse<K>> {
        return await this.instance.patch<K>(url, data)
    }

    async DELETE<K extends T>(url: string): Promise<AxiosResponse<K>> {
        return await this.instance.delete<K>(url)
    }
}
