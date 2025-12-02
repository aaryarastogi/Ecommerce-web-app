import axios from 'axios'
import * as actionType from '../constants/cartConstants'
import { backend_url } from '../../service/api';


export const addToCart=(id , quantity)=>async(dispatch)=>{
    try {
        const {data} = await axios.get(`${backend_url}/product/${id}`);

        dispatch({type:actionType.ADD_TO_CART , payload:{...data , quantity}})
    } catch (error) {
        console.log("error while adding item ")
    }
}

export const removeFromCart=(id)=>(dispatch)=>{
    dispatch({type: actionType.REMOVE_FROM_CART , payload:id})
}

export const resetCart=()=>(dispatch)=>{
    dispatch({type: actionType.CART_RESET})
}