import React, { useContext, useState } from 'react'
import { Badge, Box, Button, Typography, styled } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import LoginDialog from '../login/LoginDialog';
import { DataContext } from '../../context/DataProvider';
import Profile from './Profile';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Wrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    margin: '0 3% 0 auto',
    alignItems: 'center',
    '& > *': {
        marginRight: '40px !important',
        fontSize: 16,
        alignItems: 'center',
        color: 'white',
        fontWeight: 500
    },
    [theme.breakpoints.down('md')]: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: '0px',
        marginTop: '20px',
        width: '100%',
        '& > *': {
            marginRight: '0px !important',
            marginBottom: '25px !important',
            width: '100%',
            padding: '12px 15px',
            borderRadius: '12px',
            background: 'rgba(255, 255, 255, 0.05)',
            '&:hover': {
                background: 'rgba(255, 107, 157, 0.1)',
            }
        }
    }
}))

const Container = styled(Link)(({ theme }) => ({
    textDecoration: 'none',
    display: 'flex',
    color: 'inherit',
    [theme.breakpoints.down('sm')]: {
        display: 'flex'
    }
}))

const LoginButton = styled(Button)(({ theme }) => ({
    color: 'white',
    background: 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)',
    textTransform: 'none',
    padding: '10px 36px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(255, 107, 157, 0.3)',
    fontWeight: '600',
    height: '44px',
    marginLeft: '40px',
    transition: 'all 0.3s ease',
    "&:hover": {
        background: 'linear-gradient(135deg, #c44569 0%, #ff6b9d 100%)',
        transform: 'translateY(-2px)',
        boxShadow: '0 6px 30px rgba(255, 107, 157, 0.4)',
    },
    [theme.breakpoints.down('md')]: {
        marginLeft: 0,
        height: '50px',
        fontSize: '17px'
    }
}))

const CustomButtons = ({ closeDrawer, setLoginOpen }) => {
    const { account, setAccount, setUser } = useContext(DataContext);

    const { cartItems } = useSelector(state => state.cart);

    const handleLogin = () => {
        setLoginOpen(true);
        if (closeDrawer) closeDrawer();
    }
    return (
        <Wrapper>
            {
                account ? <Profile account={account} setAccount={setAccount} setUser={setUser} /> :
                    <LoginButton variant='contained' onClick={() => handleLogin()}>Login</LoginButton>
            }
            <Container to='/orders' onClick={() => closeDrawer && closeDrawer()}>
                <ReceiptLongIcon style={{ marginRight: 10 }} />
                <Typography sx={{whiteSpace:'nowrap'}}>My Orders</Typography>
            </Container>
            <Container to='/cart' onClick={() => closeDrawer && closeDrawer()}>
                <Badge badgeContent={cartItems?.length} color='secondary'>
                    <ShoppingCartIcon />
                </Badge>
                <Typography style={{ marginLeft: 10 }}>Cart</Typography>
            </Container>
        </Wrapper>
    )
}

export default CustomButtons