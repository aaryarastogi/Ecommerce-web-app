import { Box, Button, Grid, Typography, styled } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "./CartItem";
import TotalBalance from "./TotalBalance";
import EmptyCart from "./EmptyCart";
import { payUsingPaytm } from "../../service/api";
import { post } from "../../utils/paytm";
import axios from 'axios'
import { useState, useContext } from "react";
import { resetCart } from "../../redux/actions/cartActions";
import { DataContext } from "../../context/DataProvider";

//styling
const Container=styled(Grid)(({theme})=>({
    padding:'50px 135px',
    [theme.breakpoints.down('md')]:{
        padding:'30px 20px '
    }
}))

const Header=styled(Grid)`
    padding:24px 35px;
    background: linear-gradient(135deg, rgba(255, 107, 157, 0.2) 0%, rgba(196, 69, 105, 0.2) 100%);
    backdrop-filter: blur(20px);
    color: white;
    border-radius: 20px 20px 0 0;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-bottom: 1px solid rgba(255, 107, 157, 0.3);
`

const ButtonWrapper=styled(Box)`
    padding:28px 35px;
    background: rgba(26, 31, 58, 0.8);
    backdrop-filter: blur(20px);
    box-shadow: 0 -8px 32px rgba(0,0,0,0.3);
    border-radius: 0 0 20px 20px;
    border-top: 1px solid rgba(255, 107, 157, 0.2);
    position: sticky;
    bottom: 0;
    z-index: 10;
`
const StyledButton=styled(Button)`
    margin-left:auto;
    display:flex;
    font-weight:600;
    color:white;
    background: linear-gradient(135deg, #ff6b9d 0%, #c44569 100%);
    width:300px;
    height:56px;
    border-radius:15px;
    box-shadow: 0 8px 30px rgba(255, 107, 157, 0.4);
    transition: all 0.3s ease;
    text-transform: none;
    font-size: 17px;
    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 12px 40px rgba(255, 107, 157, 0.5);
        background: linear-gradient(135deg, #c44569 0%, #ff6b9d 100%);
    }
`
const LeftComponent=styled(Grid)(({theme})=>({
    paddingRight:20,
    [theme.breakpoints.down('md')]:{
        marginBottom:20
    }
}))


const Cart=()=>{
    const[price,setPrice]=useState(0);
    const[discount,setDiscount]=useState(0);
    const amount = price-discount+40;
    const {cartItems} = useSelector(state=>state.cart);
    const dispatch = useDispatch();
    const {user} = useContext(DataContext);

    const checkoutHandler=async()=>{
        try {
            if (cartItems.length === 0) {
                alert("Your cart is empty!");
                return;
            }

            if (amount <= 0) {
                alert("Invalid order amount!");
                return;
            }

            const { data: {key} } = await axios.get("http://localhost:8000/api/getkey")

            const { data : {order} } = await axios.post("http://localhost:8000/api/checkout",{
                amount: amount
            })
            
            if (!order || !order.id) {
                throw new Error("Failed to create order");
            }

            // Store order details for use in handler
            const orderId = order.id;
            const orderAmount = order.amount;

            const options = {
                key: key,
                amount: order.amount, 
                currency: "INR",
                name: "Aarya Rastogi",
                description: "E-commerce Transaction",
                image: "https://yt3.ggpht.com/EdRqWnGF_Ezgskw0k3GwJEiiEx4mpYyW5T_Q2bt_zbPMqk8qgoT8YjVuI_EGTAUVWWVbtg8kVCE=s108-c-k-c0x00ffffff-no-rj",
                order_id: order.id,
                callback_url: "http://localhost:8000/api/paymentverification",
                prefill: {
                    name: "Gaurav Kumar",
                    email: "gaurav.kumar@example.com",
                    contact: "9000090000"
                },
                notes: {
                    "address": "Razorpay Corporate Office",
                    "user": user ? JSON.stringify({
                        username: user.username,
                        email: user.email,
                        firstname: user.firstname
                    }) : JSON.stringify({
                        username: 'guest',
                        email: 'guest@example.com',
                        firstname: 'Guest'
                    }),
                    "amount": amount.toString()
                },
                theme: {
                    "color": "#121212"
                },
                handler: async (response) => {
                    // Clear cart immediately after successful payment
                    dispatch(resetCart());
                    console.log("Payment successful, cart cleared", response);
                    console.log("Payment response:", JSON.stringify(response, null, 2));
                    
                    // Send user info directly to backend to ensure order is saved
                    if (user && user.username && response.razorpay_payment_id) {
                        try {
                            const updateResponse = await axios.post("http://localhost:8000/api/update-payment", {
                                payment_id: response.razorpay_payment_id,
                                razorpay_order_id: response.razorpay_order_id || orderId,
                                razorpay_signature: response.razorpay_signature || 'pending',
                                user: {
                                    username: user.username,
                                    email: user.email,
                                    firstname: user.firstname
                                },
                                amount: amount
                            });
                            console.log("Payment updated with user info from handler:", updateResponse.data);
                        } catch (error) {
                            console.error("Error updating payment from handler:", error);
                            console.error("Error details:", error.response?.data);
                        }
                    } else {
                        console.warn("User not logged in or payment_id missing. User:", user, "Payment ID:", response.razorpay_payment_id);
                    }
                    // The payment verification will be handled by the callback_url
                    // User will be redirected to payment success page
                }
            };
            
            const razor = new window.Razorpay(options);
            
            razor.on('payment.failed', function (response) {
                alert(`Payment failed: ${response.error.description}`);
            });
            
            razor.open();
        } catch (error) {
            console.error("Checkout error:", error);
            alert(error.response?.data?.message || error.message || "Failed to process order. Please try again.");
        }
    }

    return(
        <> 
            {
                cartItems.length ? 
                    <Container container >
                        <LeftComponent item lg={9} md={9} sm={12} xs={12}>
                            <Header>
                                <Typography>My Cart ({cartItems?.length})</Typography>
                            </Header>
                            {
                                cartItems.map(item=>(
                                    <CartItem item={item}/>
                                ))
                            }
                            <ButtonWrapper>
                                <StyledButton onClick={()=>checkoutHandler()}>Place Order</StyledButton>
                            </ButtonWrapper>
                        </LeftComponent>
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <TotalBalance cartItems={cartItems} price={price} setPrice={setPrice} discount={discount} setDiscount={setDiscount}/>
                        </Grid>
                    </Container>
                : 
                <EmptyCart/>
            }
        
        </>
    )
}

export default Cart;