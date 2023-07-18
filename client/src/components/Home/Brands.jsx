import styled from "@emotion/styled";
import React from 'react';
import { Box, Divider, Typography } from "@mui/material"
import { brands } from "../../constants/data";


const Heading=styled(Typography)`
    font-size:22px;
    font-weight:600;
    line-height:32px;
    margin-right:25px;
`
const Container=styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    margin: '10px 15px !important',
    overflowX: 'overlay',
}))

const Component=styled(Box)`
    padding:5px 8px;
    text-align:center;
    cursor:pointer;
    line-height:32px;
`

const Brands =()=>{
    return(
        <Box style={{backgroundColor:'white' , padding:'15px 20px' , marginTop:10}}>
            <Heading>Brands</Heading>
            <Container>
            {
                brands.map(brand=>(
                    <Component>
                        <img src={brand.url} style={{width:'72px' , lineHeight:32}} alt='company'></img>
                    </Component>
                ))
            }
            </Container>
        </Box>
    )
}

export default Brands;