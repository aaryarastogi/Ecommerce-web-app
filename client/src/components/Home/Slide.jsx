import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css'
import { Box, Button, Divider, Typography, useMediaQuery, useTheme, styled } from '@mui/material';
import Countdown from 'react-countdown';
import { Link } from 'react-router-dom';


const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
      slidesToSlide: 1
    },
    smallTablet: {
      breakpoint: { max: 768, min: 600 },
      items: 2,
      slidesToSlide: 1
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: 1,
      slidesToSlide: 1
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
const Deal=styled(Box)(({ theme }) => ({
  padding: '24px 30px',
  display: 'flex',
  background: 'linear-gradient(135deg, rgba(255, 107, 157, 0.2) 0%, rgba(196, 69, 105, 0.2) 100%)',
  backdropFilter: 'blur(10px)',
  color: 'white',
  alignItems: 'center',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  [theme.breakpoints.down('sm')]: {
    padding: '15px 20px',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '15px'
  }
}));

const Timer=styled(Box)(({ theme }) => ({
  display: 'flex',
  marginLeft: '10px',
  alignItems: 'center',
  color: 'rgba(255, 255, 255, 0.9)',
  fontWeight: 500,
  [theme.breakpoints.down('sm')]: {
    marginLeft: 0
  }
}));

const DealText=styled(Typography)(({ theme }) => ({
  fontSize: '28px',
  fontWeight: 800,
  lineHeight: '32px',
  marginRight: '25px',
  letterSpacing: '-1px',
  background: 'linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.8) 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  [theme.breakpoints.down('sm')]: {
    fontSize: '22px',
    marginRight: 0
  }
}));

const ViewButton=styled(Button)(({ theme }) => ({
  marginLeft: 'auto',
  background: 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)',
  color: 'white',
  borderRadius: '12px',
  fontSize: '14px',
  fontWeight: 600,
  padding: '10px 28px',
  border: 'none',
  boxShadow: '0 4px 15px rgba(255, 107, 157, 0.3)',
  transition: 'all 0.3s ease',
  "&:hover": {
    background: "linear-gradient(135deg, #c44569 0%, #ff6b9d 100%)",
    transform: "translateY(-2px)",
    boxShadow: "0 6px 20px rgba(255, 107, 157, 0.4)",
  },
  [theme.breakpoints.down('sm')]: {
    marginLeft: 0,
    width: '100%',
    marginTop: '5px'
  }
}));
  
const Image=styled('img')({
    width:'auto',
    maxWidth: '100%',
    height:'180px',
    objectFit: 'contain',
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
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
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
                <Link to="/products" style={{ textDecoration: 'none', marginLeft: 'auto' }}>
                  <ViewButton variant='contained' color='primary'>View All</ViewButton>
                </Link>
            </Deal>
            <Divider/>
            <Carousel
                responsive={responsive}
                swipeable={true}
                draggable={true}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={4000}
                keyBoardControl={true}
                centerMode={!isMobile}
                containerClass="carousel-container"
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
            >
                { 
                  products && Array.isArray(products) && products.map((product)=>(
                    <Link to={`product/${product.id}`} style={{textDecoration:'none'}} key={product.id}>
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