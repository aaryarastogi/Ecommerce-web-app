import { useEffect } from "react";
import { useDispatch , useSelector} from "react-redux";
import { useParams } from "react-router-dom";
import { getProductDetails } from "../../redux/actions/productActions";
import {Box, Grid, Typography, styled} from '@mui/material'
import ActionItem from "./ActionItem";
import ProductDetail from "./ProductDetail";


//styling
const Component=styled(Box)`
    background:#F2F2F2;
    margin-top:55px;
`
const Container=styled(Grid)(({theme})=>({
    background:'#FFFFFF',
    display:'flex',
    [theme.breakpoints.down('md')]:{
        margin:0
    }
}))
    
const RightCont=styled(Grid)`
    margin-top:50px;
`

const DetailView=()=>{

    const {id} = useParams();
    const dispatch=useDispatch();

    const {loading , product }= useSelector(state=>state.getProductDetails)

    useEffect(()=>{
        if(product && id!==product.id){
            dispatch(getProductDetails(id));
        }
    },[dispatch , id , product , loading]);

    console.log(product);

    return(
        <Component>
            {
                product && Object.keys(product).length &&
                <Container container>
                    <Grid item lg={4} md={4} sm={8} xs={12}>
                        <ActionItem product={product} amount={3000}/>
                    </Grid>
                    <RightCont item lg={8} md={8} sm={8} xs={12}>
                        <ProductDetail product={product}/>
                    </RightCont>
                </Container>  
            }
        </Component>
    )
}

export default DetailView;