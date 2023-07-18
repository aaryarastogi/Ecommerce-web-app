import { Box, Typography, styled } from "@mui/material";

//styling
const Component=styled(Box)(({theme})=>({
    height:'65vh',
    width:'80%',
    background:'white',
    margin:'80px 140px',
    [theme.breakpoints.down('md')]:{
        margin:'120px 40px'
    }
}))

const Container=styled(Box)`
    padding-top:70px;
    text-align:center;
`

const EmptyCart=()=>{
    const imgurl = 'https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90';
    
    return(
        <Component>
            <Container>
                <img src={imgurl} alt="empty cart" style={{width:'15%'}}/>
                <Typography>Your cart is Empty</Typography>
                <Typography>Add items to Cart</Typography>
            </Container>
        </Component>
    )
}

export default EmptyCart;