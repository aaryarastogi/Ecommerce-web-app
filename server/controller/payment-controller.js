import { instance } from '../index.js';
import crypto from "crypto"
import { Payment } from "../model/paymentModel.js"


export const checkout=async(req,res)=>{
    try {
        const amount = Number(req.body.amount);
        
        if (!amount || amount <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid amount"
            });
        }

        const options = {
            amount: Math.round(amount * 100), // Convert to paise (multiply by 100)
            currency: "INR",
        };
        
        const order = await instance.orders.create(options);

        res.status(200).json({
            success: true,
            order,
        });
    } catch (error) {
        console.error("Checkout error:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Failed to create order"
        });
    }
}

export const paymentVerification=async(req,res)=>{
    try {
        const { razorpay_order_id , razorpay_payment_id , razorpay_signature, notes} = req.body;

        console.log("Payment verification request body:", JSON.stringify(req.body, null, 2));
        console.log("Notes received:", notes);

        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET)
                                        .update(body.toString())
                                        .digest("hex");
        console.log("sign generated",expectedSignature)
        console.log("sign received",razorpay_signature)
                                        
        const isAuthentic = expectedSignature === razorpay_signature;
        console.log("authenticity:" , isAuthentic);
        
        if (isAuthentic) {
            // Extract user info from notes
            let userInfo = {
                username: 'guest',
                email: 'guest@example.com',
                firstname: 'Guest'
            };
            let orderAmount = 0;

            if (notes) {
                try {
                    // Razorpay sends notes as an object, check different possible structures
                    if (typeof notes === 'object') {
                        if (notes.user) {
                            // If user is a string, parse it; if it's already an object, use it
                            if (typeof notes.user === 'string') {
                                userInfo = JSON.parse(notes.user);
                            } else {
                                userInfo = notes.user;
                            }
                        }
                        if (notes.amount) {
                            orderAmount = parseFloat(notes.amount);
                        }
                    } else if (typeof notes === 'string') {
                        // If notes is a string, try to parse it
                        const parsedNotes = JSON.parse(notes);
                        if (parsedNotes.user) {
                            if (typeof parsedNotes.user === 'string') {
                                userInfo = JSON.parse(parsedNotes.user);
                            } else {
                                userInfo = parsedNotes.user;
                            }
                        }
                        if (parsedNotes.amount) {
                            orderAmount = parseFloat(parsedNotes.amount);
                        }
                    }
                } catch (e) {
                    console.error("Error parsing notes:", e);
                    console.error("Notes value:", notes);
                }
            }

            console.log("Extracted user info:", userInfo);
            console.log("Extracted amount:", orderAmount);

            // Save payment with user information
            const payment = await Payment.create({
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
                user: userInfo,
                amount: orderAmount
            });

            console.log("Payment saved successfully:", payment._id);

            // Redirect with payment_id, and include amount if available
            const redirectUrl = orderAmount > 0 
                ? `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}&amount=${orderAmount}`
                : `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`;
            
            res.redirect(redirectUrl);
        } else {
            res.status(400).json({
                success: false,
                message: "Payment verification failed"
            });
        }
    } catch (error) {
        console.error("Payment verification error:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Payment verification failed"
        });
    }
}

export const getUserOrders = async (req, res) => {
    try {
        const { username } = req.query;
        
        if (!username) {
            return res.status(400).json({
                success: false,
                message: "Username is required"
            });
        }

        console.log("Fetching orders for username:", username);

        // Also check for payments with guest user that might need updating
        const orders = await Payment.find({ 'user.username': username })
            .sort({ createdAt: -1 })
            .select('-razorpay_signature'); // Don't send sensitive signature data

        console.log(`Found ${orders.length} orders for username: ${username}`);
        
        // Debug: Log all payments to see what's in the database
        const allPayments = await Payment.find({}).select('user.username razorpay_payment_id createdAt').limit(10);
        console.log("Recent payments in database:", JSON.stringify(allPayments, null, 2));

        res.status(200).json({
            success: true,
            orders
        });
    } catch (error) {
        console.error("Get user orders error:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch orders"
        });
    }
}

export const updatePaymentUserInfo = async (req, res) => {
    try {
        const { payment_id, user, amount, razorpay_order_id, razorpay_signature } = req.body;
        
        if (!payment_id) {
            return res.status(400).json({
                success: false,
                message: "Payment ID is required"
            });
        }

        console.log("Updating payment:", payment_id, "with user:", user?.username, "amount:", amount);

        // Try to find the payment first
        let payment = await Payment.findOne({ razorpay_payment_id: payment_id });

        if (!payment) {
            // Payment doesn't exist yet, create it if we have order_id and signature
            if (razorpay_order_id && razorpay_signature && user) {
                console.log("Payment not found, creating new payment record");
                payment = await Payment.create({
                    razorpay_order_id,
                    razorpay_payment_id: payment_id,
                    razorpay_signature: razorpay_signature || 'pending',
                    user: user,
                    amount: amount || 0
                });
                console.log("Payment created successfully:", payment._id);
            } else {
                console.log("Payment not found and insufficient data to create. Will retry later.");
                return res.status(200).json({
                    success: true,
                    message: "Payment will be updated when callback completes"
                });
            }
        } else {
            // Payment exists, update it
            const updateData = {};
            if (user) {
                updateData.user = user;
            }
            if (amount && amount > 0) {
                updateData.amount = amount;
            }

            payment = await Payment.findOneAndUpdate(
                { razorpay_payment_id: payment_id },
                { $set: updateData },
                { new: true }
            );
            console.log("Payment updated successfully:", payment._id);
        }

        res.status(200).json({
            success: true,
            payment
        });
    } catch (error) {
        console.error("Update payment user info error:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Failed to update payment"
        });
    }
}