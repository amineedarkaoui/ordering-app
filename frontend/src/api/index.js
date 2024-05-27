import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8081/ordering-app/api/v1",
    headers: {
        "ngrok-skip-browser-warning": "true"
    }
});

export const getAllCategories = async () => {
    try {
        const response = await api.get(
            `/category/get-all-categories`
        )
        return response.data
    } catch(err) {
        return err
    }
}

export const getCategoryItems = async (id) => {
    try {
        const response = await api.get(
            `/item/get-category-items?id=${id}`
        )
        return response.data
    } catch(err) {
        return err
    }
}

export const placeOrder = async (data) => {
    try {
        const response = await api.post(
            `/order/place-order`,
            data
        )
        return response.data
    } catch(err) {
        return err  
    }
}

export const getAllOrders = async () => {
    try {
        const response = await api.get(
            `/order/get-all-orders`
        )
        return response.data
    } catch(err) {
        return err
    }
}