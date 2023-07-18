import styled from '@emotion/styled'
import { InputBase , Box, List, ListItem} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import React, { useEffect, useState } from 'react'
import {useSelector , useDispatch} from 'react-redux';
import { getProducts } from '../../redux/actions/productActions';
import { Link } from 'react-router-dom';

const InputBaseSearch=styled(InputBase)`
    padding-left:20px;
    width:100%;
    font-size:unset;
`

const SearchContainer=styled(Box)`
    background:white;
    width:38%;
    border-radius:2px;
    margin-left:10px;
`

const SearchIconWrapper=styled(Box)`
    color:#434242;
    padding:5px;
    display:flex;
`

const ListStyling=styled(List)`
  position:absolute;
  background:white;
  color:black;
  margin-top:36px;
`

const Search = () => {
  const [text,setText]=useState('');

  const {products}=useSelector(state => state.getProducts)
  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(getProducts())
  } , [dispatch]);

  const getText=(text)=>{
    setText(text);
  }

  return (
    <SearchContainer style={{display:'flex'}}>
        <InputBaseSearch
        placeholder='Search for products , brands and more'
        onChange={(e)=>getText(e.target.value)}
        value={text}
        />
        <SearchIconWrapper><SearchIcon/></SearchIconWrapper>
        {
          text && 
              <ListStyling>
                {
                  products.filter(product => product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product=>(
                    <ListItem>
                      <Link
                        to={`/product/${product.id}`}
                        onClick={()=>setText('')}
                        style={{textDecoration:'none',color:'inherit'}}
                      >
                        {product.title.longTitle}
                      </Link>
                    </ListItem>
                  ))
                }
              </ListStyling>
        }
    </SearchContainer>
  )
}

export default Search