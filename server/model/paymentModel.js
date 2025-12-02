import mongoose from "mongoose";

const paymentSchema=new mongoose.Schema({
    razorpay_order_id:{
        type:String,
        required:true
    } , 
    razorpay_payment_id:{
        type:String,
        required:true
    } ,  
    razorpay_signature:{
        type:String,
        required:true
    },
    user: {
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        firstname: {
            type: String,
            required: true
        }
    },
    amount: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const Payment=mongoose.model("Payment" , paymentSchema);