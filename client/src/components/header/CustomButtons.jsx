import React, { useContext, useState } from 'react'
import {Badge, Box , Button, Typography , styled} from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginDialog from '../login/LoginDialog';
import { DataContext } from '../../context/DataProvider';
import Profile from './Profile';
import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';

const Wrapper=styled(Box)(({theme})=>({
    display:'flex',
    margin:'0 3% 0 auto',
    '& > *' :{
        marginRight:'40px !important',
        fontSize:16,
        alignItems:'center'
    },
    [theme.breakpoints.down('md')]:{
        display:'block',
        alignItems:'center',
        marginLeft:'10px',
        marginTop:'8px'
    }
}))

const Container=styled(Link)(({theme})=>({
    textDecoration:'none',
    display:'flex',
    color:'inherit',
    [theme.breakpoints.down('sm')]:{
        display:'flex'
    }
}))
    
const LoginButton=styled(Button)({
    color:'#434242',
    background:'white',
    textTransform:'none',
    padding:'5px 40px',
    borderRadius:'2px',
    boxShadow:'none',
    fontWeight:'600',
    height:'32px',
    marginLeft:'40px',
    "&:hover": {
        color: "white",
        backgroundColor:"#434242"
    },
})
    
const CustomButtons = () => {
    const[open,setOpen]=useState(false);
    const {account , setAccount}=useContext(DataContext);

    const {cartItems} = useSelector(state=>state.cart);

    const handleLogin=()=>{
        setOpen(true);
    }
  return (
    <Wrapper>
        {
            account ? <Profile account={account} setAccount={setAccount}/> :
            <LoginButton variant='contained' onClick={()=>handleLogin()}>Login</LoginButton>
        }
        <Typography style={{marginTop: 3 , width:135}}>What's new</Typography>
        <Typography style={{marginTop: 3 , width:135}}>Deals</Typography>
        <Container to='/cart'>
            <Badge badgeContent={cartItems?.length} color='secondary'>
                <ShoppingCartIcon/>
            </Badge>
            <Typography style={{marginLeft:10}}>Cart</Typography>
        </Container>
        <LoginDialog open={open} setOpen={setOpen}/>
    </Wrapper>
  )
}

export default CustomButtons