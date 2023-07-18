import { Box, Button, Typography, styled } from "@mui/material";
import React from "react";
import { Link, useSearchParams } from "react-router-dom";

const Container=styled(Box)`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    display:flex;
    flex-direction:column;
`
const Heading = styled(Typography)`
    font-size:28px;
    font-weight:600;
`

const Text=styled(Typography)`
    font-size:14px;
    text-transform:uppercase;
`
const PaymentSuccess=()=>{

    const searchQuery=useSearchParams()[0]
    const referenceNum=searchQuery.get("reference");

    return(
       <Container >
            <Heading>Order Successfull</Heading>
            <Text>Reference Number: {referenceNum}</Text>
            <Button variant='contained' style={{marginTop:10}}><Link to='/' style={{textDecoration:'none', color:'white'}}>Continue Shopping</Link></Button>
       </Container>
    )
}

export default PaymentSuccess