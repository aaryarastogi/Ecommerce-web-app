import { Box, Divider, Typography , styled} from "@mui/material";
import { useEffect, useState } from "react";

//styling
const Header=styled(Box)`
    padding:15px 24px;
    background:white;
    border-bottom:1px solid f0f0f0;
`
const Heading=styled(Typography)`
    color:#878787;
    font-weight:600;
`

const Container=styled(Box)`
    padding:15px 24px;
    background:white;
    & > p {
        margin-bottom:20px;
        font-size:14px;
    }
`

const Price= styled(Box)`
    float:right
`
const TotalBalance=({cartItems})=>{
    const[price,setPrice]=useState(0);
    const[discount,setDiscount]=useState(0);

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
                <Typography component="h4" style={{fontWeight:600 , marginTop:10}}>Total Amount
                    <Price component="span">₹{price - discount + 40}</Price>
                </Typography>
                <Typography style={{fontWeight:500 , marginTop:10 , color:'green'}}>You will save ₹{discount - 40} on this order</Typography>
            </Container>
        </Box>
    )
}

export default TotalBalance;