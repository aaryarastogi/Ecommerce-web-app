import { Box, Button, Grid, Typography, styled } from "@mui/material";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import TotalBalance from "./TotalBalance";
import EmptyCart from "./EmptyCart";
import { payUsingPaytm } from "../../service/api";
import { post } from "../../utils/paytm";
import axios from 'axios'

//styling
const Container=styled(Grid)(({theme})=>({
    padding:'30px 135px',
    [theme.breakpoints.down('md')]:{
        padding:'15px 0 '
    }
}))

const Header=styled(Grid)`
    padding:15px 24px;
    background-color:white;
`

const ButtonWrapper=styled(Box)`
    padding:16px 22px;
    background:white;
    box-shadow:0 -2px 10px 0 rgb(0,0,0,10%);
`
const StyledButton=styled(Button)`
    margin-left:auto;
    display:flex;
    font-weight:600;
    color:white;
    background-color:#fb641b;
    width:250px;
    height:51px;
    border-radius:2px;
`
const LeftComponent=styled(Grid)(({theme})=>({
    paddingRight:15,
    [theme.breakpoints.down('md')]:{
        marginBottom:15
    }
}))


const Cart=(amount)=>{
    
    const {cartItems} = useSelector(state=>state.cart);

    const checkoutHandler=async(amount)=>{
        // console.log(req.body.amount);
        const { data: {key} } = await axios.get("http://localhost:8000/api/getkey")

        const { data : {order} } = await axios.post("http://localhost:8000/api/checkout",{
            amount
        })
        console.log("order",order)
        
        const options = {
            key: key,
            amount: order.amount, 
            currency: "INR",
            name: "Aarya Rastogi",
            description: "Test Transaction",
            image: "https://yt3.ggpht.com/EdRqWnGF_Ezgskw0k3GwJEiiEx4mpYyW5T_Q2bt_zbPMqk8qgoT8YjVuI_EGTAUVWWVbtg8kVCE=s108-c-k-c0x00ffffff-no-rj",
            order_id: order.id,
            callback_url: "http://localhost:8000/api/paymentverification",
            prefill: {
                name: "Gaurav Kumar",
                email: "gaurav.kumar@example.com",
                contact: "9000090000"
            },
            notes: {
                "address": "Razorpay Corporate Office"
            },
            theme: {
                "color": "#121212"
            }
        };
        const razor = new window.Razorpay(options);
        razor.open();
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
                                <StyledButton onClick={()=>checkoutHandler(amount)}>Place Order</StyledButton>
                            </ButtonWrapper>
                        </LeftComponent>
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <TotalBalance cartItems={cartItems}/>
                        </Grid>
                    </Container>
                : 
                <EmptyCart/>
            }
        
        </>
    )
}

export default Cart;