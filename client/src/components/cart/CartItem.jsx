import { Box, Button, Typography, styled } from "@mui/material";
import { addEllipsis } from "../../utils/common-utils";
import BtnGroup from "./ButtonGroup";
import { removeFromCart } from "../../redux/actions/cartActions";
import { useDispatch } from "react-redux";

const Wrapper=styled(Box)`
    display:flex;
    border-top:1px solid rgba(255, 255, 255, 0.1);
    background: rgba(26, 31, 58, 0.6);
    backdrop-filter: blur(20px);
    border-radius: 20px;
    margin: 15px 0;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
    &:hover {
        box-shadow: 0 8px 30px rgba(255, 107, 157, 0.2);
        transform: translateY(-4px);
        border-color: rgba(255, 107, 157, 0.3);
    }
`
const LeftComp=styled(Box)`
    margin:24px;
    display:flex;
    flex-direction:column;
    img {
        border-radius: 16px;
        object-fit: cover;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    }
`

const SmallText=styled(Typography)`
    font-size:14px;
    margin-top:10px;
    color:rgba(255, 255, 255, 0.7);
`
const Remove=styled(Button)`
    font-size:14px;
    font-weight:600;
    margin-top:20px;
    color:#ff6b9d;
    text-transform: none;
    padding: 10px 24px;
    border-radius: 12px;
    background: rgba(255, 107, 157, 0.1);
    border: 1px solid rgba(255, 107, 157, 0.3);
    transition: all 0.3s ease;
    &:hover {
        background: rgba(255, 107, 157, 0.2);
        border-color: rgba(255, 107, 157, 0.5);
        transform: translateY(-2px);
        color: #c44569;
    }
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
                <Typography style={{color: 'white', fontSize: '18px', fontWeight: 600}}>{addEllipsis(item.title.longTitle)}</Typography>
                <SmallText>Seller: RetailNet
                    {/* <Box component="span"><img src={fassured} alt="flipkart assured" style={{width:50 , marginLeft:10}}/></Box> */}
                </SmallText>
                <Typography style={{margin:'20px 0'}}>
                    <span style={{ fontWeight:700 , fontSize:22, color: '#ff6b9d'}}>₹{item.price.cost}</span>&nbsp;&nbsp;&nbsp; 
                    <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}><strike>₹{item.price.mrp}</strike></span>&nbsp;&nbsp;&nbsp;
                    <span style={{ color: '#4ade80', fontWeight: 600 }}>{item.price.discount} off</span>
                </Typography>
                <Remove onClick={()=>removeItemFromCart(item.id)}>Remove</Remove>
            </Box>
        </Wrapper>
    )
}


export default CartItem;