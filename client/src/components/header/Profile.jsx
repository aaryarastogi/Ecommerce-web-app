import styled from "@emotion/styled";
import { Box, Menu, MenuItem, Typography } from "@mui/material"
import { useState } from "react"
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { Link } from 'react-router-dom';

//styling
const Component=styled(Menu)`
    margin-top:5px;
`
const Logout=styled(Typography)`
    font-size:14px;
    margin-left:20px;
`

const Profile=({account , setAccount, setUser})=>{
    const[open,setOpen]=useState(false);
    const handleClick=(event)=>{
        setOpen(event.currentTarget)
    }
    const handleClose=()=>{
        setOpen(false);
    }
    const logoutUser=()=>{
        setAccount('');
        setUser(null);
    }
    return(
        <>
        <Box onClick={handleClick}><Typography style={{marginTop:2 , cursor:'pointer'}}>{account}</Typography></Box>
            <Component
                anchorEl={open}
                open={Boolean(open)}
                onClose={handleClose}
                >
                <MenuItem onClick={()=>{handleClose();logoutUser();}}>
                    <PowerSettingsNewIcon color="primary" fontSize="small"/>
                    <Logout>Logout</Logout>
                </MenuItem>
            </Component>
        </>
    )
}
export default Profile