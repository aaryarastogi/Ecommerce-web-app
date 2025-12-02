import { useEffect } from "react";
import { useDispatch , useSelector} from "react-redux";
import { useParams } from "react-router-dom";
import { getProductDetails } from "../../redux/actions/productActions";
import {Box, Grid, Typography, styled} from '@mui/material'
import ActionItem from "./ActionItem";
import ProductDetail from "./ProductDetail";


//styling
const Component=styled(Box)`
    background: transparent;
    margin-top:80px;
    min-height: calc(100vh - 80px);
    padding: 40px 20px;
`
const Container=styled(Grid)(({theme})=>({
    background:'rgba(26, 31, 58, 0.6)',
    backdropFilter: 'blur(20px)',
    display:'flex',
    borderRadius: '24px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    overflow: 'hidden',
    margin: '0 20px',
    [theme.breakpoints.down('md')]:{
        margin:'0 10px',
        borderRadius: '20px',
    }
}))
    
const RightCont=styled(Grid)`
    margin-top:50px;
    padding: 30px;
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