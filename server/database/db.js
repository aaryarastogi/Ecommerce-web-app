import mongoose from "mongoose";
export const Connection=async(username,pwd)=>{
    const URL= `mongodb+srv://${username}:${pwd}@ecommerce.g4wfc1b.mongodb.net/?retryWrites=true&w=majority`;
    try {
        await mongoose.connect(URL,{});
        console.log('connected to mongodb')
    } catch (error) {
        console.log('error while connecting with database',error.message);
    }
}
export default Connection
