import { Box, Button, Typography, styled } from "@mui/material";
import { addEllipsis } from "../../utils/common-utils";
import BtnGroup from "./ButtonGroup";
import { removeFromCart } from "../../redux/actions/cartActions";
import { useDispatch } from "react-redux";

const Wrapper=styled(Box)`
    display:flex;
    border-top:1px solid #f0f0f0;
    background:white;    
`
const LeftComp=styled(Box)`
    margin:20px;
    display:flex;
    flex-direction:column;
`

const SmallText=styled(Typography)`
    font-size:14px;
    margin-top:10px;
    color:#878787;
`
const Remove=styled(Button)`
    font-size:16px;
    font-weight:600;
    margin-top:20px;
    color:black;
`

const CartItem=({item})=>{

    // const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png'

    const dispatch=useDispatch();

    const removeItemFromCart=(id)=>{
        dispatch(removeFromCart(id));
    }

    return(
        <Wrapper>
            <LeftComp>
                <img src={item.url} alt='product image' style={{height:'110px'}}/>
                <BtnGroup/>
            </LeftComp>
            <Box style={{margin:20}}>
                <Typography>{addEllipsis(item.title.longTitle)}</Typography>
                <SmallText>Seller: RetailNet
                    {/* <Box component="span"><img src={fassured} alt="flipkart assured" style={{width:50 , marginLeft:10}}/></Box> */}
                </SmallText>
                <Typography style={{margin:'20px 0'}}>
                    <span style={{ fontWeight:600 , fontSize:18}}>₹{item.price.cost}</span>&nbsp;&nbsp;&nbsp; 
                    <span style={{ color: '#878787' }}><strike>₹{item.price.mrp}</strike></span>&nbsp;&nbsp;&nbsp;
                    <span style={{ color: '#388E3C' }}>{item.price.discount} off</span>
                </Typography>
                <Remove onClick={()=>removeItemFromCart(item.id)}>Remove</Remove>
            </Box>
        </Wrapper>
    )
}


export default CartItem;