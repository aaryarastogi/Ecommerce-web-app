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
    color:'white',
    background: 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)',
    textTransform:'none',
    padding:'10px 36px',
    borderRadius:'12px',
    boxShadow:'0 4px 20px rgba(255, 107, 157, 0.3)',
    fontWeight:'600',
    height:'44px',
    marginLeft:'40px',
    transition: 'all 0.3s ease',
    "&:hover": {
        background: 'linear-gradient(135deg, #c44569 0%, #ff6b9d 100%)',
        transform: 'translateY(-2px)',
        boxShadow:'0 6px 30px rgba(255, 107, 157, 0.4)',
    },
})
    
const CustomButtons = () => {
    const[open,setOpen]=useState(false);
    const {account , setAccount, setUser}=useContext(DataContext);

    const {cartItems} = useSelector(state=>state.cart);

    const handleLogin=()=>{
        setOpen(true);
    }
  return (
    <Wrapper>
        {
            account ? <Profile account={account} setAccount={setAccount} setUser={setUser}/> :
            <LoginButton variant='contained' onClick={()=>handleLogin()}>Login</LoginButton>
        }
        <Container style={{marginTop: 3 , width:135}} to='/orders'>My Orders</Container>
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