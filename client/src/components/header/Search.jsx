import { styled, InputBase , Box, List, ListItem} from '@mui/material'
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

const SearchContainer=styled(Box)(({theme}) => ({
    background:'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    width:'100%',
    borderRadius:'15px',
    marginLeft:'10px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.3s ease',
    '&:hover': {
        background: 'rgba(255, 255, 255, 0.08)',
        borderColor: 'rgba(255, 107, 157, 0.3)',
        boxShadow: '0 6px 30px rgba(255, 107, 157, 0.2)',
    },
    '&:focus-within': {
        background: 'rgba(255, 255, 255, 0.1)',
        borderColor: 'rgba(255, 107, 157, 0.5)',
    },
    [theme.breakpoints.down('md')]: {
        marginLeft: 0,
        marginTop: '10px',
        marginBottom: '10px',
    }
}));

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

const ListStyling=styled(List)(({theme}) => ({
  position:'absolute',
  background: 'rgba(26, 31, 58, 0.95)',
  backdropFilter: 'blur(20px)',
  color: 'white',
  marginTop:'36px',
  borderRadius: '15px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
  zIndex: 1000,
  maxHeight: '400px',
  overflowY: 'auto',
  width: '100%',
  '& .MuiListItem-root': {
    transition: 'all 0.2s ease',
    borderRadius: '8px',
    margin: '4px 8px',
    '&:hover': {
      background: 'rgba(255, 107, 157, 0.1)',
      transform: 'translateX(5px)',
    }
  },
  [theme.breakpoints.down('md')]: {
      marginTop: '45px',
  }
}));

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
                  products && Array.isArray(products) && products.filter(product => product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product=>(
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