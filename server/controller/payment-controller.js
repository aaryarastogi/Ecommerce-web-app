import { instance } from '../index.js';
import crypto from "crypto"
import { Payment } from "../model/paymentModel.js"


export const checkout=async(req,res)=>{
//     const amount = parseFloat(req.body.amount.value)
//    console.log("req.body",req.body);

    const options = {
        amount:Number((req.body.amount.amount)*100), 
        currency: "INR",
    };
    const order = await instance.orders.create(options);

    // console.log(order);

    res.status(200).json({
        success:true,
        order,
    })
}

export const paymentVerification=async(req,res)=>{

    const { razorpay_order_id , razorpay_payment_id , razorpay_signature} = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET)
                                    .update(body.toString())
                                    .digest("hex");
                                    console.log("sign generated",razorpay_signature)
                                    console.log("sign received",expectedSignature)
                                    
     const isAuthentic = expectedSignature === razorpay_signature;
    console.log("authenticity:" , isAuthentic);
    if (isAuthentic) {
    // Database comes here
        await Payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
    });

    res.redirect(
      `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
    );
  } else {
    res.status(400).json({
      success: false,
    });
  }

}