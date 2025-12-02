import axios from "axios";
import * as actionTypes from '../constants/productConstant'
import { backend_url } from "../../service/api";

export const getProducts=()=> async(dispatch) =>{
    try {
        const {data} = await axios.get(`${backend_url}/products`);
        dispatch({type: actionTypes.GET_PRODUCT_SUCCESS , payload:data });
    } catch (error) {
        dispatch({type:actionTypes.GET_PRODUCT_FAIL , payload:error.message })
    }
}

export const getProductDetails=(id)=>async(dispatch)=>{
    try {
        dispatch({type: actionTypes.GET_PRODUCT_DETAILS_REQUEST });
        const {data} = await axios.get(`${backend_url}/product/${id}`);
        dispatch({type: actionTypes.GET_PRODUCT_DETAILS_SUCCESS , payload:data });
    } catch (error) {
        dispatch({type: actionTypes.GET_PRODUCT_DETAILS_FAIL , payload: error.message})
    }
}