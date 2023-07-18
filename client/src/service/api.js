import axios from 'axios';

const URL='http://localhost:8000';
export const authenticateSignUp=async(user)=>{
    try {
       return await axios.post(`${URL}/signup`,user);
    } catch (error) {
        console.log("Error while calling signup API",error.response.data);
    }
}

export const authenticateLogin=async(user)=>{
    try {
       return await axios.post(`${URL}/login`,user);
    } catch (error) {
        console.log("Error while calling login API",error.response.data);
        return error.response;
    }
}

export const payUsingPaytm=async(data)=>{
    try {
        let response = await axios.post(`${URL}/payment` , data);
        return response.data;
    } catch (error) {
        console.log("error while calling payment api" , error)
    }
}