import { Box ,styled } from "@mui/material"
import Slide from "./Slide";


const Component=styled(Box)`
    display:flex;
`
const LeftComp = styled(Box)(({ theme}) => ({
    width: '100%',
    [theme.breakpoints.down('md')]: {
        width: '100%'
    }
}))
const RightComp = styled(Box)(({ theme}) => ({
    marginTop: 10,
    background: '#FFFFFF',
    width: '17%',
    marginLeft: 10,
    padding: 5,
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
        display: 'none'
    }
}));

const MidSlide=({products , title , timer})=>{
    const adURL = 'https://rukminim1.flixcart.com/flap/464/708/image/633789f7def60050.jpg?q=70';

    return(
        <Component>
            <LeftComp>
                <Slide products={products} title={title} timer={timer}/>
            </LeftComp>
            {/* <RightComp>
                <img src={adURL} alt='add' style={{width:'217px'}}/>
            </RightComp> */}
        </Component>
    )
}

export default MidSlide;