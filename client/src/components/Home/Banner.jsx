import React from 'react'
import {Box, Typography, Grid, Button, styled} from '@mui/material'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SecurityIcon from '@mui/icons-material/Security';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { Link } from 'react-router-dom';

const HeroContainer = styled(Box)(({theme}) => ({
    background: 'linear-gradient(135deg, rgba(255, 107, 157, 0.1) 0%, rgba(196, 69, 105, 0.1) 100%)',
    backdropFilter: 'blur(20px)',
    borderRadius: '30px',
    padding: '80px 60px',
    marginBottom: '50px',
    color: 'white',
    position: 'relative',
    overflow: 'hidden',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    '&::before': {
        content: '""',
        position: 'absolute',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(255, 107, 157, 0.2) 0%, transparent 70%)',
        top: '-200px',
        right: '-200px',
        borderRadius: '50%',
        animation: 'pulse 4s ease-in-out infinite',
    },
    '&::after': {
        content: '""',
        position: 'absolute',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(196, 69, 105, 0.15) 0%, transparent 70%)',
        bottom: '-150px',
        left: '-150px',
        borderRadius: '50%',
        animation: 'pulse 5s ease-in-out infinite',
    },
    '@keyframes pulse': {
        '0%, 100%': { transform: 'scale(1)', opacity: 1 },
        '50%': { transform: 'scale(1.1)', opacity: 0.8 }
    },
    [theme.breakpoints.down('md')]: {
        padding: '50px 30px',
        borderRadius: '20px',
    }
}));

const HeroTitle = styled(Typography)(({theme}) => ({
    fontSize: '64px',
    fontWeight: 800,
    marginBottom: '24px',
    lineHeight: 1.1,
    zIndex: 1,
    position: 'relative',
    background: 'linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.8) 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    letterSpacing: '-2px',
    [theme.breakpoints.down('md')]: {
        fontSize: '40px',
        letterSpacing: '-1px',
    }
}));

const HeroSubtitle = styled(Typography)(({theme}) => ({
    fontSize: '22px',
    marginBottom: '40px',
    opacity: 0.85,
    zIndex: 1,
    position: 'relative',
    lineHeight: 1.7,
    fontWeight: 300,
    color: 'rgba(255, 255, 255, 0.9)',
    [theme.breakpoints.down('md')]: {
        fontSize: '18px',
    }
}));

const CTAButton = styled(Button)({
    background: 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)',
    color: 'white',
    padding: '16px 48px',
    borderRadius: '15px',
    fontSize: '18px',
    fontWeight: 600,
    textTransform: 'none',
    boxShadow: '0 8px 30px rgba(255, 107, 157, 0.4)',
    zIndex: 1,
    position: 'relative',
    transition: 'all 0.3s ease',
    border: 'none',
    '&:hover': {
        background: 'linear-gradient(135deg, #c44569 0%, #ff6b9d 100%)',
        transform: 'translateY(-3px)',
        boxShadow: '0 12px 40px rgba(255, 107, 157, 0.5)'
    }
});

const FeaturesContainer = styled(Box)(({theme}) => ({
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '50px',
    flexWrap: 'wrap',
    gap: '30px',
    zIndex: 1,
    position: 'relative',
    [theme.breakpoints.down('md')]: {
        marginTop: '30px',
        gap: '20px',
    }
}));

const FeatureBox = styled(Box)({
    textAlign: 'center',
    flex: '1 1 200px',
    minWidth: '150px',
});

const FeatureIcon = styled(Box)({
    fontSize: '48px',
    marginBottom: '15px',
    opacity: 0.9,
    color: '#ff6b9d',
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'scale(1.1) rotate(5deg)',
        color: '#c44569',
    }
});

const FeatureText = styled(Typography)({
    fontSize: '15px',
    fontWeight: 500,
    opacity: 0.85,
    color: 'rgba(255, 255, 255, 0.9)',
});

const Banner = () => {
  return (
    <HeroContainer>
        <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={8}>
                <HeroTitle>
                    Welcome to Cartify
                </HeroTitle>
                <HeroSubtitle>
                    Discover premium quality products at unbeatable prices. Shop with confidence and enjoy fast, secure delivery to your doorstep.
                </HeroSubtitle>
                <Link to="/" style={{textDecoration: 'none'}}>
                    <CTAButton variant="contained" startIcon={<ShoppingBagIcon />}>
                        Shop Now
                    </CTAButton>
                </Link>
            </Grid>
        </Grid>
        
        <FeaturesContainer>
            <FeatureBox>
                <FeatureIcon>
                    <LocalShippingIcon sx={{ fontSize: 48 }} />
                </FeatureIcon>
                <FeatureText>Free Shipping</FeatureText>
            </FeatureBox>
            <FeatureBox>
                <FeatureIcon>
                    <SecurityIcon sx={{ fontSize: 48 }} />
                </FeatureIcon>
                <FeatureText>Secure Payment</FeatureText>
            </FeatureBox>
            <FeatureBox>
                <FeatureIcon>
                    <VerifiedUserIcon sx={{ fontSize: 48 }} />
                </FeatureIcon>
                <FeatureText>Quality Assured</FeatureText>
            </FeatureBox>
            <FeatureBox>
                <FeatureIcon>
                    <ShoppingBagIcon sx={{ fontSize: 48 }} />
                </FeatureIcon>
                <FeatureText>Easy Returns</FeatureText>
            </FeatureBox>
        </FeaturesContainer>
    </HeroContainer>
  )
}

export default Banner