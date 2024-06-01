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

export const switchCancelOrder = async (id) => {
    try {
        const response = await api.post(
            `/order/switch-cancel-order?id=${id}`,{}
        )
        return response.data
    } catch(err) {
        return err
    }
}

export const addNewCategory = async (name, image) => {
    const data = new FormData()
    data.append("name", name)
    data.append("image", image)
    try {
        const response = await api.post(
            `/category/add-new-category?`,
            data,
        )
        return response.data
    } catch(err) {
        return err
    }
}

export const deleteCategory = async (id) => {
    try {
        const response = await api.put(
            `/category/delete-category?id=${id}`,
            {}
        )
        return response.data
    } catch(err) {
        return err  
    }
}

export const updateCategory = async (id, name, image) => {
    const data = new FormData()
    data.append("name", name)
    data.append("image", image)
    data.append("id", id)
    try {
        const response = await api.put(
            `/category/update-category`,
            data
        )
        return response.data
    } catch(err) {
        return err  
    }
}

export const addNewItem = async (name, price, category) => {
    try {
        const response = await api.post(
            `/item/add-new-item`,
            category,
            {params: {
                "name": name,
                "price": price,
            }}
        )
        return response.data
    } catch(err) {
        return err  
    }
}
export const updateItemImage = async (id, image) => {
    const data = new FormData()
    data.append("image", image)
    data.append("id", id)
    try {
        const response = await api.put(
            `/item/update-item-image`,
            data
        )
        return response.data
    } catch(err) {
        return err  
    }
}

export const deleteItem = async (id) => {
    try {
        const response = await api.put(
            `/item/delete-item?id=${id}`,
            {}
        )
        return response.data
    } catch(err) {
        return err  
    }
}

export const updateItem = async (id, name, price, category) => {
    try {
        const response = await api.put(
            `/item/update-item`,
            category,
            {params: {
                "id": id,
                "name": name,
                "price": price,
            }}
        )
        return response.data
    } catch(err) {
        return err  
    }
}