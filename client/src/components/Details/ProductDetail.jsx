import { Box, Table, TableBody, TableCell, TableRow, Typography, styled } from "@mui/material";
import { LocalOffer as Badge } from '@mui/icons-material';

//styling
const SmallText=styled(Box)`
    font-size:14px;
    vertical-align: baseline;
    & > p{
        font-size:14px;
        margin-top:10px;
    }
`

const StyleBadge=styled(Badge)`
    font-size:15px;
    margin-right:10px;
    color:#00CC00;
`

const TableText=styled(TableRow)`
    font-size:14px;
    vertical-align: baseline;
    & > td{
        font-size:14px;
        margin-top:10px;
        border:none;
    }
`

const ProductDetail=({product})=>{
    const date=new Date(new Date().getTime()+(5*24*60*60*1000));
    const adURL = 'https://rukminim1.flixcart.com/lockin/774/185/images/CCO__PP_2019-07-14.png?q=50';


    return(
        <Box style={{marginLeft:10}}>
            <Typography>{product.title.longTitle}</Typography>
                <Typography style={{marginTop: 5, color: '#878787', fontSize: 14 }}>
                    8 Ratings & 1 Reviews
                </Typography>
                <Typography>
                    <span style={{ fontSize: 28 }}>₹{product.price.cost}</span>&nbsp;&nbsp;&nbsp; 
                    <span style={{ color: '#878787' }}><strike>₹{product.price.mrp}</strike></span>&nbsp;&nbsp;&nbsp;
                    <span style={{ color: '#388E3C' }}>{product.price.discount} off</span>
                </Typography>
            <Typography>Avaiable Offers</Typography>
            <SmallText>
                <Typography><StyleBadge/>Get extra 20% off upto ₹50 on 1 item(s) T&C</Typography>
                <Typography><StyleBadge/>Get extra 13% off (price inclusive of discount) T&C </Typography>
                <Typography><StyleBadge/>Sign up for Flipkart Pay Later and get Flipkart Gift Card worth ₹100*</Typography>
                <Typography><StyleBadge/>Buy 2 items save 5%; Buy 3 or more save 10% T&C</Typography>
                <Typography><StyleBadge/>5% Cashback on Flipkart Axis Bank Card T&C</Typography>
                <Typography><StyleBadge/>No Cost EMI on Bajaj Finserv EMI Card on cart value above ₹2999 T&C</Typography>
            </SmallText>
            <Table>
                <TableBody>
                    <TableText>
                        <TableCell style={{color:'#878787'}}>Delivery</TableCell>
                        <TableCell style={{fontWeight:600}}>Delivery by {date.toDateString()} | ₹40</TableCell>
                    </TableText>
                    <TableText>
                        <TableCell style={{color:'#878787'}}>Warranty</TableCell>
                        <TableCell>No Warranty</TableCell>
                    </TableText>
                    <TableText>
                        <TableCell style={{color:'#878787'}}>Seller</TableCell>
                        <TableCell>
                            <Box component="span" style={{color:'#434242'}}>Super ComNet</Box>
                            <Typography>GST invoice available</Typography>
                            <Typography>View more sellers starting from ₹{product.price.cost}</Typography>
                        </TableCell>
                    </TableText>
                    {/* <TableText>
                        <TableCell colSpan={2}>
                            <img src={adURL} alt="flipkart points" style={{width:390}}/>
                        </TableCell>
                    </TableText> */}
                    <TableText>
                        <TableCell style={{color:'#878787'}}>Description</TableCell>
                        <TableCell>{product.description}</TableCell>
                    </TableText>
                </TableBody>
            </Table>
        </Box>
    )
}

export default ProductDetail;