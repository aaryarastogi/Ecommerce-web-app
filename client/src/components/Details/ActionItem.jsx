import { Box, Button, styled } from "@mui/material"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";
import { useState } from "react";
import { payUsingPaytm } from "../../service/api";
import { post } from "../../utils/paytm";

//styling
const LeftContainer=styled(Box)(({theme})=>({
    minWidth:'40%',
    padding:'40px 0 0 80px',
    [theme.breakpoints.down('lg')]:{
        padding:'20px 40px'
    }
}))
    
const Image=styled('img')({
    padding:'15px',
    width:'80%'
})

const StyledButton=styled(Button)(({theme})=>({
    borderRadius:2,
    marginTop:10,
    Width:'48%',
    height:50,
    [theme.breakpoints.down('lg')]:{
        width:'46%'
    },
    [theme.breakpoints.down('sm')]:{
        width:'48%'
    }
}))


const ActionItem=({product})=>{

    const navigate= useNavigate();
    const dispatch=useDispatch();

    const[quantiy , setQuantity] = useState(1);

    const {id} = product;

    const addItemToCart=()=>{
        dispatch(addToCart(id , quantiy));
        navigate('/cart');
    }


    return(
        <LeftContainer>
            <Box style={{padding:'15px 20px',border:'1px solid #f0f0f0'}}>
                <Image src={product.url} alt='product' />
            </Box>
            <StyledButton onClick={()=>addItemToCart()} variant="contained" style={{marginRight:10 , backgroundColor:'#ff9f00'}}><ShoppingCartIcon/>Add to cart</StyledButton>
            {/* <StyledButton onClick={()=>buyNow()} variant="contained" style={{backgroundColor:'#fb541B'}}><FlashOnIcon/>BUY NOW</StyledButton> */}
            {/* <StyledButton variant="contained" style={{backgroundColor:'#fb541B'}}><FlashOnIcon/>BUY NOW</StyledButton> */}
        </LeftContainer>
    )
}

export default ActionItem;