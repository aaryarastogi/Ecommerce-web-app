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
  margin-top:30px;
  background: rgba(26, 31, 58, 0.6);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 40px rgba(255, 107, 157, 0.2);
    border-color: rgba(255, 107, 157, 0.3);
  }
`
const Deal=styled(Box)`
  padding:24px 30px;
  display:flex;
  background: linear-gradient(135deg, rgba(255, 107, 157, 0.2) 0%, rgba(196, 69, 105, 0.2) 100%);
  backdrop-filter: blur(10px);
  color: white;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`
const Timer=styled(Box)`
  display:flex;
  margin-left:10px;
  align-items:center;
  color:rgba(255, 255, 255, 0.9);
  font-weight: 500;
`
const DealText=styled(Typography)`
  font-size:28px;
  font-weight:800;
  line-height:32px;
  margin-right:25px;
  letter-spacing: -1px;
  background: linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.8) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`
const ViewButton=styled(Button)({
  marginLeft:'auto',
  background: 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)',
  color: 'white',
  borderRadius:'12px',
  fontSize:'14px',
  fontWeight:600,
  padding: '10px 28px',
  border: 'none',
  boxShadow: '0 4px 15px rgba(255, 107, 157, 0.3)',
  transition: 'all 0.3s ease',
  "&:hover": {
    background: "linear-gradient(135deg, #c44569 0%, #ff6b9d 100%)",
    transform: "translateY(-2px)",
    boxShadow: "0 6px 20px rgba(255, 107, 157, 0.4)",
  },
})
  
const Image=styled('img')({
    width:'auto',
    height:'180px',
    transition: 'all 0.4s ease',
    borderRadius: '12px',
    filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3))',
    '&:hover': {
        transform: 'scale(1.1) rotate(2deg)',
        filter: 'drop-shadow(0 8px 20px rgba(255, 107, 157, 0.4))',
    }
})

const Text=styled(Typography)`
    font-size:14px;
    margin-top:8px;
    color: rgba(255, 255, 255, 0.9);
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
                        <Box textAlign='center' sx={{
                            padding:'30px 20px',
                            transition: 'all 0.3s ease',
                            borderRadius: '16px',
                            margin: '12px',
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.05)',
                            '&:hover': {
                                background: 'rgba(255, 107, 157, 0.1)',
                                transform: 'translateY(-8px)',
                                borderColor: 'rgba(255, 107, 157, 0.3)',
                                boxShadow: '0 8px 25px rgba(255, 107, 157, 0.2)'
                            }
                        }}>
                            <Image src={product.url} alt="product"/>
                            <Text style={{fontWeight:700 , color:'white', marginTop: '15px', fontSize: '16px'}}>{product.title.shortTitle}</Text>
                            <Text style={{color:'#ff6b9d', fontWeight: 700, marginTop: '8px', fontSize: '15px'}}>{product.discount}</Text>
                            <Text style={{color:'rgba(255, 255, 255, 0.6)' , fontSize: '12px', marginTop: '6px'}}>{product.tagline}</Text>
                        </Box>
                      </Link>
                    )) 
                }
            </Carousel>
        </Component>
    )
}

export default Slide;