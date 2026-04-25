import mongoose from "mongoose";
export const Connection=async(username,pwd)=>{
    const URL= 
    `mongodb+srv://${username}:${pwd}@ecommerce.g4wfc1b.mongodb.net/?appName=Ecommerce`;
    try {
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.log('Error while connecting with the database: ', error.message);
        console.log('TIP: Check if your IP is whitelisted in MongoDB Atlas or if the connection string is correct.');
    }
}
export default Connection
