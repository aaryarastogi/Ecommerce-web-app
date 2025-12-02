import { Box, Divider, Typography , styled} from "@mui/material";
import { useEffect, useState } from "react";

//styling
const Header=styled(Box)`
    padding:24px 28px;
    background: linear-gradient(135deg, rgba(255, 107, 157, 0.2) 0%, rgba(196, 69, 105, 0.2) 100%);
    backdrop-filter: blur(20px);
    color: white;
    border-radius: 20px 20px 0 0;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-bottom: 1px solid rgba(255, 107, 157, 0.3);
`
const Heading=styled(Typography)`
    color:white;
    font-weight:800;
    font-size: 20px;
    letter-spacing: 0.5px;
`

const Container=styled(Box)`
    padding:24px 28px;
    background: rgba(26, 31, 58, 0.6);
    backdrop-filter: blur(20px);
    border-radius: 0 0 20px 20px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    & > p {
        margin-bottom:20px;
        font-size:15px;
        color: rgba(255, 255, 255, 0.9);
    }
`

const Price= styled(Box)`
    float:right;
    font-weight: 700;
    color: #ff6b9d;
`
const TotalBalance=({cartItems,price,setPrice,discount,setDiscount})=>{

    useEffect(()=>{
        totalAmount();
    },[cartItems]);

    const totalAmount=()=>{
        let price=0 , discount=0;
        cartItems.map(item=>{
            price+=item.price.mrp;
            discount+=(item.price.mrp - item.price.cost);
        });
        setPrice(price);
        setDiscount(discount);
    }

    return(
        <Box>
            <Header>
                <Heading>PRICE DETAILS</Heading>
            </Header>  
            <Container>
                <Typography>Price ({cartItems?.length} item)
                    <Price component="span">₹{price}</Price>
                </Typography>
                <Typography>Discount
                    <Price component="span">-₹{discount}</Price>
                </Typography>
                <Typography>Delivery Charges
                    <Price component="span">₹40</Price>
                </Typography>
                <Divider/>
                <Typography component="h4" style={{fontWeight:800 , marginTop:20, fontSize: '22px', color: 'white'}}>Total Amount
                    <Price component="span" style={{fontSize: '24px', color: '#ff6b9d'}}>₹{price - discount + 40}</Price>
                </Typography>
                <Typography style={{fontWeight:600 , marginTop:15 , color:'#4ade80', fontSize: '15px', padding: '12px', background: 'rgba(74, 222, 128, 0.1)', borderRadius: '12px', border: '1px solid rgba(74, 222, 128, 0.3)'}}>You will save ₹{discount - 40} on this order</Typography>
            </Container>
        </Box>
    )
}

export default TotalBalance;