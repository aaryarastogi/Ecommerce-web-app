import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Box, Typography, Container, Card, CardContent, Grid, styled, CircularProgress, Alert, Button, IconButton } from '@mui/material';
import { DataContext } from '../../context/DataProvider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import RefreshIcon from '@mui/icons-material/Refresh';
import { backend_url } from '../../service/api';

const StyledContainer = styled(Container)(({ theme }) => ({
    padding: '50px 20px',
    marginTop: '20px',
    background: 'transparent',
    minHeight: 'calc(100vh - 80px)'
}));

const OrderCard = styled(Card)(({ theme }) => ({
    marginBottom: '24px',
    borderRadius: '24px',
    background: 'rgba(26, 31, 58, 0.6)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    '&:hover': {
        boxShadow: '0 12px 40px rgba(255, 107, 157, 0.2)',
        transform: 'translateY(-6px)',
        borderColor: 'rgba(255, 107, 157, 0.3)'
    }
}));

const OrderHeader = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    paddingBottom: '20px',
    borderBottom: '2px solid rgba(255, 255, 255, 0.1)',
    background: 'linear-gradient(135deg, rgba(255, 107, 157, 0.2) 0%, rgba(196, 69, 105, 0.2) 100%)',
    backdropFilter: 'blur(10px)',
    padding: '24px 28px',
    color: 'white'
});

const OrderInfo = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
});

const EmptyState = styled(Box)({
    textAlign: 'center',
    padding: '80px 20px',
    background: 'rgba(26, 31, 58, 0.6)',
    backdropFilter: 'blur(20px)',
    borderRadius: '24px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
    color: 'rgba(255, 255, 255, 0.7)'
});

const Orders = () => {
    const { user } = useContext(DataContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const fetchOrders = useCallback(async () => {
        if (!user || !user.username) {
            setLoading(false);
            setError('Please login to view your orders');
            return;
        }

        try {
            setLoading(true);
            setError('');
            console.log('Fetching orders for user:', user.username);
            const response = await axios.get(`${backend_url}/api/orders?username=${user.username}`);
            
            console.log('Orders API response:', response.data);
            
            if (response.data.success) {
                setOrders(response.data.orders);
                console.log(`Loaded ${response.data.orders.length} orders`);
            } else {
                setError('Failed to fetch orders');
                console.error('Failed to fetch orders:', response.data);
            }
        } catch (err) {
            console.error('Error fetching orders:', err);
            console.error('Error response:', err.response?.data);
            setError('Failed to load orders. Please try again.');
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatAmount = (amount) => {
        return `₹${amount.toFixed(2)}`;
    };

    if (!user || !user.username) {
        return (
            <StyledContainer>
                <Alert 
                    severity="info" 
                    sx={{ marginTop: 2 }}
                    action={
                        <Button color="inherit" size="small" onClick={() => navigate('/')}>
                            Go to Home
                        </Button>
                    }
                >
                    Please login to view your orders.
                </Alert>
            </StyledContainer>
        );
    }

    if (loading) {
        return (
            <StyledContainer>
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
                    <CircularProgress />
                </Box>
            </StyledContainer>
        );
    }

    if (error) {
        return (
            <StyledContainer>
                <Alert severity="error">{error}</Alert>
            </StyledContainer>
        );
    }

    return (
        <StyledContainer maxWidth="lg">
            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ marginBottom: '40px' }}>
                <Typography variant="h4" sx={{ 
                    fontWeight: 800, 
                    background: 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontSize: '36px',
                    letterSpacing: '-1px'
                }}>
                    My Orders
                </Typography>
                <IconButton 
                    onClick={fetchOrders} 
                    disabled={loading}
                    sx={{
                        background: 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)',
                        color: 'white',
                        boxShadow: '0 4px 15px rgba(255, 107, 157, 0.3)',
                        '&:hover': {
                            background: 'linear-gradient(135deg, #c44569 0%, #ff6b9d 100%)',
                            transform: 'rotate(180deg)',
                            boxShadow: '0 6px 20px rgba(255, 107, 157, 0.4)'
                        },
                        transition: 'all 0.3s ease'
                    }}
                    title="Refresh orders"
                >
                    <RefreshIcon />
                </IconButton>
            </Box>

            {orders.length === 0 ? (
                <EmptyState>
                    <Typography variant="h6" gutterBottom>
                        No orders found
                    </Typography>
                    <Typography variant="body2">
                        You haven't placed any orders yet.
                    </Typography>
                </EmptyState>
            ) : (
                <Grid container spacing={3}>
                    {orders.map((order, index) => (
                        <Grid item xs={12} key={order._id || index}>
                            <OrderCard>
                                <CardContent>
                                    <OrderHeader>
                                        <OrderInfo>
                                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                Order #{order.razorpay_payment_id?.substring(0, 8).toUpperCase()}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {formatDate(order.createdAt)}
                                            </Typography>
                                        </OrderInfo>
                                        <Typography variant="h6" sx={{ color: '#2874f0', fontWeight: 600 }}>
                                            {formatAmount(order.amount)}
                                        </Typography>
                                    </OrderHeader>
                                    
                                    <Box sx={{ marginTop: '15px' }}>
                                        <Typography variant="body2" sx={{ marginBottom: '8px' }}>
                                            <strong>Order ID:</strong> {order.razorpay_order_id}
                                        </Typography>
                                        <Typography variant="body2" sx={{ marginBottom: '8px' }}>
                                            <strong>Payment ID:</strong> {order.razorpay_payment_id}
                                        </Typography>
                                        <Typography variant="body2" color="success.main" sx={{ fontWeight: 600 }}>
                                            ✓ Payment Successful
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </OrderCard>
                        </Grid>
                    ))}
                </Grid>
            )}
        </StyledContainer>
    );
};

export default Orders;