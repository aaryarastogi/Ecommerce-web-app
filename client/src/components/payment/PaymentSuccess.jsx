import { Box, Button, Typography, styled } from "@mui/material";
import React, { useEffect, useContext } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetCart } from "../../redux/actions/cartActions";
import { DataContext } from "../../context/DataProvider";
import axios from "axios";

const Container=styled(Box)`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction:column;
    background: #0a0e27;
    background-image: 
        radial-gradient(at 0% 0%, rgba(255, 107, 157, 0.2) 0px, transparent 50%),
        radial-gradient(at 100% 0%, rgba(196, 69, 105, 0.2) 0px, transparent 50%),
        radial-gradient(at 100% 100%, rgba(255, 107, 157, 0.15) 0px, transparent 50%),
        radial-gradient(at 0% 100%, rgba(196, 69, 105, 0.15) 0px, transparent 50%);
    position: relative;
    overflow: hidden;
    &::before {
        content: '';
        position: absolute;
        width: 500px;
        height: 500px;
        background: radial-gradient(circle, rgba(255, 107, 157, 0.3) 0%, transparent 70%);
        top: -200px;
        right: -200px;
        border-radius: 50%;
        animation: pulse 4s ease-in-out infinite;
    }
    &::after {
        content: '';
        position: absolute;
        width: 400px;
        height: 400px;
        background: radial-gradient(circle, rgba(196, 69, 105, 0.25) 0%, transparent 70%);
        bottom: -150px;
        left: -150px;
        border-radius: 50%;
        animation: pulse 5s ease-in-out infinite;
    }
    @keyframes pulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.1); opacity: 0.8; }
    }
`
const Heading = styled(Typography)`
    font-size:56px;
    font-weight:800;
    background: linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.8) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 24px;
    z-index: 1;
    letter-spacing: -2px;
`

const Text=styled(Typography)`
    font-size:18px;
    text-transform:uppercase;
    color: rgba(255, 255, 255, 0.8);
    letter-spacing: 3px;
    z-index: 1;
    margin-bottom: 50px;
    font-weight: 500;
`
const PaymentSuccess=()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useContext(DataContext);
    const searchQuery=useSearchParams()[0]
    const referenceNum=searchQuery.get("reference");
    const orderAmount = searchQuery.get("amount"); // Get amount from URL if passed

    useEffect(() => {
        // Clear cart after successful payment
        dispatch(resetCart());
        
        // Update payment with user info if user is logged in
        // This ensures orders show up even if Razorpay callback didn't include notes
        if (referenceNum && user && user.username) {
            const updatePaymentInfo = async (retryCount = 0) => {
                try {
                    const updateData = {
                        payment_id: referenceNum,
                        user: {
                            username: user.username,
                            email: user.email,
                            firstname: user.firstname
                        }
                    };
                    
                    // Include amount if available
                    if (orderAmount) {
                        updateData.amount = parseFloat(orderAmount);
                    }
                    
                    const response = await axios.post("http://localhost:8000/api/update-payment", updateData);
                    console.log("Payment updated with user info:", response.data);
                } catch (error) {
                    console.error("Error updating payment info:", error);
                    // Retry up to 3 times with increasing delays
                    if (retryCount < 3) {
                        setTimeout(() => updatePaymentInfo(retryCount + 1), (retryCount + 1) * 2000);
                    }
                }
            };
            // Add a delay to ensure payment is saved first, then retry if needed
            setTimeout(() => updatePaymentInfo(0), 2000);
        }
    }, [dispatch, referenceNum, user, orderAmount]);

    return(
       <Container >
            <Heading>Order Successful</Heading>
            <Text>Reference Number: {referenceNum}</Text>
            <Box style={{display:'flex', gap:'15px', marginTop:20, flexDirection:'column', alignItems:'center', zIndex: 1}}>
                <Button 
                    variant='contained' 
                    sx={{
                        marginTop: 2,
                        background: 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)',
                        color: 'white',
                        padding: '16px 48px',
                        borderRadius: '15px',
                        fontSize: '18px',
                        fontWeight: 600,
                        textTransform: 'none',
                        boxShadow: '0 8px 30px rgba(255, 107, 157, 0.4)',
                        '&:hover': {
                            background: 'linear-gradient(135deg, #c44569 0%, #ff6b9d 100%)',
                            transform: 'translateY(-3px)',
                            boxShadow: '0 12px 40px rgba(255, 107, 157, 0.5)'
                        },
                        transition: 'all 0.3s ease'
                    }}
                    onClick={() => navigate('/orders')}
                >
                    View My Orders
                </Button>
                <Button 
                    variant='outlined' 
                    sx={{
                        marginTop: 2,
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                        color: 'white',
                        padding: '14px 42px',
                        borderRadius: '15px',
                        fontSize: '16px',
                        fontWeight: 600,
                        textTransform: 'none',
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(10px)',
                        '&:hover': {
                            border: '2px solid rgba(255, 107, 157, 0.5)',
                            background: 'rgba(255, 107, 157, 0.1)',
                            transform: 'translateY(-2px)'
                        },
                        transition: 'all 0.3s ease'
                    }}
                >
                    <Link to='/' style={{textDecoration:'none', color:'inherit'}}>Continue Shopping</Link>
                </Button>
            </Box>
       </Container>
    )
}

export default PaymentSuccess