import axios from 'axios';

export const backend_url='https://ecommerce-web-app-backend-ea95.onrender.com';
export const authenticateSignUp=async(user)=>{
    try {
       return await axios.post(`${backend_url}/signup`,user);
    } catch (error) {
        console.log("Error while calling signup API",error.response.data);
    }
}

export const authenticateLogin=async(user)=>{
    try {
       return await axios.post(`${backend_url}/login`,user);
    } catch (error) {
        console.log("Error while calling login API",error.response.data);
        return error.response;
    }
}

export const payUsingPaytm=async(data)=>{
    try {
        let response = await axios.post(`${backend_url}/payment` , data);
        return response.data;
    } catch (error) {
        console.log("error while calling payment api" , error)
    }
}