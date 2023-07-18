import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css'
import { Box, Button, Divider, Typography } from '@mui/material';
import styled from '@emotion/styled';
import Countdown from 'react-countdown';
import { Link } from 'react-router-dom';


const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

const Component=styled(Box)`
  margin-top:10px;
  background-color:#FFFFFF;
`
const Deal=styled(Box)`
  padding:15px 20px;
  display:flex;
`
const Timer=styled(Box)`
  display:flex;
  margin-left:10px;
  align-items:center;
  color:#7f7f7f;
`
const DealText=styled(Typography)`
  font-size:22px;
  font-weight:600;
  line-height:32px;
  margin-right:25px;
`
const ViewButton=styled(Button)({
  marginLeft:'auto',
  backgroundColor:'#434242',
  borderRadius:'2px',
  fontSize:'13px',
  fontWeight:600,
  "&:hover": {
    color: "#434242",
    backgroundColor:"white"
  },
})
  
const Image=styled('img')({
    width:'auto',
    height:'150px'
})

const Text=styled(Typography)`
    font-size:14px;
    margin-top:5px;
`

const Slide=({products , title , timer})=>{
    const timerURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/timer_a73398.svg';
   
    const renderer = ({ hours, minutes, seconds}) => {
        return <Box variant="span">{hours} : {minutes} : {seconds} Left</Box>
    }

    return(
        <Component>
            <Deal>
                <DealText>{title}</DealText>
                {
                    timer && 
                        <Timer>
                            <img src={timerURL} alt="timer" style={{width:'24px'}}/>
                            <Countdown date={Date.now()+5.04e+7}
                            renderer={renderer}
                            />
                        </Timer>
                }
                <ViewButton variant='contained' color='primary'>View All</ViewButton>
            </Deal>
            <Divider/>
            <Carousel
                responsive={responsive}
                swipeable={false}
                draggable={false}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={4000}
                keyBoardControl={true}
                centerMode={true}
                containerClass="carousel-container"
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
            >
                {
                    products.map(product=>(
                      <Link to={`product/${product.id}`} style={{textDecoration:'none'}}>
                        <Box textAlign='center' style={{padding:'25px 15px'}}>
                            <Image src={product.url} alt="product"/>
                            <Text style={{fontWeight:600 , color:'#212121'}}>{product.title.shortTitle}</Text>
                            <Text style={{color:'#434242'}}>{product.discount}</Text>
                            <Text style={{color:'#212121' , opacity:'0.6'}}>{product.tagline}</Text>
                        </Box>
                      </Link>
                    )) 
                }
            </Carousel>
        </Component>
    )
}

export default Slide;