import axios from 'axios'
import * as actionType from '../constants/cartConstants'


export const addToCart=(id , quantity)=>async(dispatch)=>{
    try {
        const {data} = await axios.get(`http://localhost:8000/product/${id}`);

        dispatch({type:actionType.ADD_TO_CART , payload:{...data , quantity}})
    } catch (error) {
        // dispatch({type:actionType.ADD_TO_CART_ERROR , payload: error.message})
        console.log("error while adding item ")
    }
}

export const removeFromCart=(id)=>(dispatch)=>{
    dispatch({type: actionType.REMOVE_FROM_CART , payload:id})
}

export const resetCart=()=>(dispatch)=>{
    dispatch({type: actionType.CART_RESET})
}