import React, { Fragment, useEffect } from 'react'
import {Box} from '@mui/material'
import Navbar from './Navbar'
import Banner from './Banner'
import { styled } from '@mui/material'
import { getProducts } from '../../redux/actions/productActions';
import { useDispatch , useSelector } from 'react-redux';
import Slide from './Slide';
import MidSlide from './MidSlide';
import MidSection from './MidSection'
import Brands from './Brands'
import Footer from './Footer'

const Container=styled(Box)`
  padding:10px;
  background:#F2F2F2;
`

const Home = () => {
  const {products} = useSelector(state=>state.getProducts) //this getProducts is a reducer which i make in store.js
  //object destructuring method
  console.log(products);

  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(getProducts()); //this getProducts is a function 
  },[dispatch]) //empty array is passed to show componentDidMount
  
  return (
    <Fragment>
        <Navbar/>
        <Container>
          <Banner/>
          <MidSlide products={products} title="Deal of the Day" timer={true}/>
          <MidSection/>
          <Slide products={products} title="Discounts For You" timer={false}/>
          <Brands/>
          <Slide products={products} title="Suggested Items" timer={false}/>
          {/* <Slide products={products} title="Top Selection" timer={false}/>
          <Slide products={products} title="Recommended Items" timer={false}/>
          <Slide products={products} title="Trending Offers"timer={false}/> */}
          {/* <Slide products={products} title="Season's Top Picks" timer={false}/>
          <Slide products={products} title="Top Deals on Accessories" timer={false}/> */}
          <Footer/>
        </Container>
    </Fragment>
  )
}

export default Home