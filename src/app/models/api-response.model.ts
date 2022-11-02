import { Product } from "./product.model"

export interface APIResponse {
    apiVersion: string,
    status: string,
    data: {
        machineProducts: Product[]
    }
}