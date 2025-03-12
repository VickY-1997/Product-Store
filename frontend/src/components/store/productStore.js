import {create } from 'zustand'
import axios from 'axios'

export const useProductStore = create((set) => ({
    products : [],
    isUpdatePopupOpen : false, 
    selectedProduct : null, 
    setProducts : (products) => set({products}),
    createProduct : async (newProduct) => {
        if(!newProduct.name || !newProduct.price || !newProduct.img){
            return {success :false , message : "Please fill all fields"}
        }
        const res = await axios.post("http://localhost:1997/api/products", newProduct)
        const data = await res.data
        set((state) => ({products:[...state.products, data.product]}))
        return {success :true, message: "Product created successfully"}
    },
    fetchProducts : async () => {
        const res = await axios.get('http://localhost:1997/api/products')
        const data = await res.data
        set({products : data.allProduct})
    },
    deleteProduct : async (pid) => {
        const res = await axios.delete(`http://localhost:1997/api/products/${pid}`)
        const data = await res.data
        if(!data.success){
            return {success : false, message : data.message}
        }
        set(state => ({products : state.products.filter(product => product._id !== pid)}))
        return {success:true, message : data.message}
    },

    openUpdatePopup : (product) => set({isUpdatePopupOpen :true, selectedProduct : product}),
    closeUpdatePopup : () => set({isUpdatePopupOpen : false, selectedProduct: null}),

    updateProduct : async (pid, updatedData) => {
        const res = await axios.put(`http://localhost:1997/api/products/${pid}`, updatedData)
        const data = await res.data
        if(data.success){
            set((state) => ({
                products:state.products.map((product) => product._id === pid ? {...product, ...updatedData} : product)
            }))
        }
        return data
    }
}))