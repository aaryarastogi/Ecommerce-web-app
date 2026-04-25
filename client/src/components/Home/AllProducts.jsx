import React, { useEffect } from 'react';
import { Box, Grid, Typography, styled, Container } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../../redux/actions/productActions';
import { Link } from 'react-router-dom';

const Component = styled(Box)`
    padding: 30px 50px;
    background: #0a0e27;
    min-height: 100vh;
    @media (max-width: 768px) {
        padding: 20px;
    }
`;

const Title = styled(Typography)`
    font-size: 32px;
    font-weight: 800;
    margin-bottom: 30px;
    color: white;
    background: linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.7) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
`;

const ProductCard = styled(Box)`
    text-align: center;
    padding: 25px 15px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 20px;
    transition: all 0.3s ease;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &:hover {
        background: rgba(255, 107, 157, 0.08);
        transform: translateY(-10px);
        border-color: rgba(255, 107, 157, 0.3);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
    }
`;

const Image = styled('img')({
    width: 'auto',
    maxWidth: '100%',
    height: '150px',
    objectFit: 'contain',
    marginBottom: '15px',
    filter: 'drop-shadow(0 5px 15px rgba(0,0,0,0.3))'
});

const ProductName = styled(Typography)`
    font-size: 16px;
    font-weight: 700;
    color: white;
    margin-top: 10px;
`;

const DiscountText = styled(Typography)`
    color: #ff6b9d;
    font-weight: 700;
    font-size: 14px;
    margin-top: 5px;
`;

const Tagline = styled(Typography)`
    color: rgba(255, 255, 255, 0.5);
    font-size: 12px;
    margin-top: 5px;
`;

const AllProducts = () => {
    const { products } = useSelector(state => state.getProducts);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!products || products.length === 0) {
            dispatch(getProducts());
        }
    }, [dispatch, products]);

    return (
        <Component>
            <Container maxWidth="xl">
                <Title>Explore All Products</Title>
                <Grid container spacing={3}>
                    {
                        products && products.map(product => (
                            <Grid item lg={3} md={4} sm={6} xs={12} key={product.id}>
                                <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                                    <ProductCard>
                                        <Box>
                                            <Image src={product.url} alt={product.title.shortTitle} />
                                            <ProductName>{product.title.shortTitle}</ProductName>
                                            <DiscountText>{product.discount}</DiscountText>
                                        </Box>
                                        <Tagline>{product.tagline}</Tagline>
                                    </ProductCard>
                                </Link>
                            </Grid>
                        ))
                    }
                </Grid>
            </Container>
        </Component>
    );
};

export default AllProducts;
