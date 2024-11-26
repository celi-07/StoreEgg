import axios from "axios"
import { productType } from "./types"

export const getProduct = async (query: string): Promise<productType[]> => {
    const response = await axios.get('https://fakestoreapi.com/products')
    // console.log(response)
    const filteredData = response.data.filter((data: productType | null) =>
        data?.title.toLowerCase().startsWith(query.toLowerCase())
    )
    return filteredData
}

export const getProductDetails = async (id: number): Promise<productType> => {
    const strId: string = id.toString()
    const response = await axios.get(`https://fakestoreapi.com/products/${strId}`)
    return response.data
}
