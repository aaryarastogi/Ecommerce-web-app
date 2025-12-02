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
    color: rgba(255, 255, 255, 0.9);
    &::placeholder {
        color: rgba(255, 255, 255, 0.5);
    }
`

const SearchContainer=styled(Box)`
    background:rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    width:100%;
    border-radius:15px;
    margin-left:10px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
    &:hover {
        background: rgba(255, 255, 255, 0.08);
        border-color: rgba(255, 107, 157, 0.3);
        box-shadow: 0 6px 30px rgba(255, 107, 157, 0.2);
    }
    &:focus-within {
        background: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 107, 157, 0.5);
    }
`

const SearchIconWrapper=styled(Box)`
    color:#ff6b9d;
    padding:8px 12px;
    display:flex;
    cursor: pointer;
    transition: all 0.2s ease;
    &:hover {
        color: #c44569;
        transform: scale(1.1);
    }
`

const ListStyling=styled(List)`
  position:absolute;
  background: rgba(26, 31, 58, 0.95);
  backdrop-filter: blur(20px);
  color: white;
  margin-top:36px;
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  z-index: 1000;
  max-height: 400px;
  overflow-y: auto;
  & .MuiListItem-root {
    transition: all 0.2s ease;
    border-radius: 8px;
    margin: 4px 8px;
    &:hover {
      background: rgba(255, 107, 157, 0.1);
      transform: translateX(5px);
    }
  }
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