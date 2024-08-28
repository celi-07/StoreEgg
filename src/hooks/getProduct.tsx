import axios from "axios"

export const productUrl = 'https://fakestoreapi.com/products'
export const getProduct = async (query="") => {
    const response = await axios.get(productUrl);
    const filteredData = response.data.filter((data: any) =>
    data.title.toLowerCase().includes(query.toLowerCase())
    );
    return [...filteredData]
}

export const getDetails = async (url: string) => {
    const response = await axios.get(url);
    return response.data
}
