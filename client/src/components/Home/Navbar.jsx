import { Box, Typography , styled } from '@mui/material'
import React from 'react'
import { navData } from '../../constants/data'

const ComponentBox= styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  margin: '55px 130px 0 130px !important',
  overflowX: 'overlay',
  [theme.breakpoints.down('lg')]: {
      margin: '0px !important'
  }
}))

const Container=styled(Box)`
  padding:12px 8px;
  text-align:center;
  cursor:pointer;
`
const Text=styled(Typography)`
  font-size:14px;
  font-weight:600;
  font-family:inherit;
`
const Navbar = () => {
  return (
    <Box style={{backgroundColor:'white'}}>
      <ComponentBox>
        {
          navData.map(data=>(
            <Container>
              <img src={data.url} alt='navbar' style={{width:'64px'}}></img>
              <Text>{data.text}</Text>
            </Container>
          ))
        }
      </ComponentBox>
    </Box>
  )
}

export default Navbar