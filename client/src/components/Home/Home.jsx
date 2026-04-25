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
  padding:40px;
  background: transparent;
  min-height: calc(100vh - 80px);
  @media (max-width: 768px) {
    padding: 20px;
  }
`

const Home = () => {
  const {products} = useSelector(state=>state.getProducts) 
  
  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(getProducts()); 
  },[dispatch]) 
  
  // Safe slicing of products array
  const deals = products ? products.slice(0, 7) : [];
  const discounts = products ? products.slice(7, 12) : [];
  const suggested = products ? products.slice(12, 16) : [];

  return (
    <Fragment>
        <Container>
          <Banner/>
          {products && products.length > 0 && (
            <>
              <MidSlide products={deals} title="Deal of the Day" timer={true}/>
              <Slide products={discounts} title="Discounts For You" timer={false}/>
              <Brands/>
              <Slide products={suggested} title="Suggested Items" timer={false}/>
            </>
          )}
          <Footer/>
        </Container>
    </Fragment>
  )
}

export default Home