import { Box, Divider, Grid, List, ListItem, Typography, styled } from "@mui/material";
import CopyrightIcon from '@mui/icons-material/Copyright';

const Component=styled(Box)(({theme})=>({
    background: 'rgba(26, 31, 58, 0.8)',
    backdropFilter: 'blur(20px)',
    width:'100%',
    height:'auto',
    marginTop:'60px',
    color:'white',
    justifyContent:'space-around',
    borderRadius: '24px 24px 0 0',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderBottom: 'none',
    boxShadow: '0 -8px 32px rgba(0, 0, 0, 0.3)'
}))

const Heading=styled(Typography)(({theme})=>({
    marginLeft:'40px',
    marginTop:'40px',
    marginBottom:'20px',
    fontSize:32,
    fontWeight:600,
}))

const Text=styled(Typography)(({theme})=>({
    marginLeft:'40px',
    fontSize:16,
    width:'75%'
}))

const Container=styled(List)(({theme})=>({
    marginLeft:'60px',
    marginTop:'30px',
    fontSize:16,
    width:'75%',
    [theme.breakpoints.down('md')]:{
        marginLeft:30,
        marginTop:0,
    }
}))

const Footer=()=>{
    return(
        <Component>
            <Grid container lg={12} md={12} sm={12} xs={12} style={{justifyContent:'space-around'}}>
                <Grid item lg={4} md={4} sm={12} xs={12}>
                    <Box>
                        <Heading>Cartify</Heading>
                        <Text>Specializes in providing high quality and stylish products for your wardrobe.</Text>
                    </Box>
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12}>
                    <Container>
                        <ListItem style={{fontWeight:600}}>COMPANY</ListItem>
                        <ListItem>About Us</ListItem>
                        <ListItem>Contact</ListItem>
                        <ListItem>Affiliate</ListItem>
                    </Container>
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12}>
                    <Container>
                        <ListItem style={{fontWeight:600}}>SUPPORT</ListItem>
                        <ListItem>FAQs</ListItem>
                        <ListItem>Terms Of Use</ListItem>
                        <ListItem>Cookie Policy</ListItem>
                    </Container>
                </Grid>
            </Grid>
            <Divider style={{backgroundColor:'rgba(255,255,255,0.2)' , margin:'20px 40px'}}/>
            <Typography style={{fontSize:'14px' , textAlign:'center' , paddingBottom:'20px', opacity: 0.9 }}>Copyright <CopyrightIcon style={{fontSize:14 , marginTop:'2px'}}/> 2024 &nbsp; &nbsp;~ Aarya Rastogi </Typography>
        </Component>
    )
}

export default Footer;