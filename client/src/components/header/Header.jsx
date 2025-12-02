import React, { useState } from 'react'
import {AppBar , Toolbar , Box , Drawer , styled, Typography, IconButton, List, ListItem} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
//Components
import Search from './Search';
import CustomButtons from './CustomButtons';
import { Link } from 'react-router-dom';

const StyledHeader=styled(AppBar)`
    background: rgba(10, 14, 39, 0.8);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    height:80px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
`
const Component=styled(Link)`
    margin-left:12%;
    line-height:0;
    text-decoration:none;
    color:inherit;
    font-weight: 800;
    font-size: 28px;
    letter-spacing: -1px;
    background: linear-gradient(135deg, #ff6b9d 0%, #c44569 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    transition: all 0.3s ease;
    &:hover {
        transform: scale(1.05);
        filter: brightness(1.2);
    }
`

const SubHeading=styled(Typography)`
    font-size:10px;
    font-style:italic;
`

const PlusImage=styled('img')({
    width:10,
    height:10,
    marginLeft:4
})

const CustomButtonWrapper=styled(Box)(({theme})=>({
    margin : '0 5% 0 auto',
    [theme.breakpoints.down('md')]:{
        display:'none'
    }
}))

const MenuButton=styled(IconButton)(({theme})=>({
    display:'none',
    [theme.breakpoints.down('md')]:{
        display:'block'
    }
}))

const Header = () => {
    const logoUrl='https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png'
    const subURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/plus_aef861.png'

    const[open,setOpen]=useState(false);

    const handleOpen=()=>{
        setOpen(true);
    }

    const handleClose=()=>{
        setOpen(false);
    }

    const list = () => (
        <Box style={{ width: 250 }} onClick={handleClose}>
            <List>
                <listItem button>
                    <CustomButtons />
                </listItem>
            </List>
        </Box>
    );

  return (
    <StyledHeader position="sticky" elevation={0}>
        <Toolbar style={{minHeight:'80px', padding: '0 40px'}}>

            <MenuButton style={{color:'inherit'}} onClick={handleOpen}>
                <MenuIcon/>
            </MenuButton>
            <Drawer open={open} onClose={handleClose}>
                {list()}
            </Drawer>

            <Component to='/'>
                <h3>Cartify</h3>
            </Component>
            <Search/>
            <CustomButtonWrapper>
                <CustomButtons/>
            </CustomButtonWrapper>
        </Toolbar>
    </StyledHeader>
  )
}

export default Header