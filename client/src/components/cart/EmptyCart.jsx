import { Box, Button, Link, Typography, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Component = styled(Box)(({ theme }) => ({
  height: "65vh",
  width: "80%",
  margin: "80px auto",
  background: "transparent",
  backdropFilter: "blur(12px)",
  borderRadius: "20px",
  padding: "40px 20px",
  boxShadow: "0 15px 50px rgba(255, 107, 157, 0.4)",
  border: '1px solid rgba(255, 255, 255, 0.1)',
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  [theme.breakpoints.down("md")]: {
    width: "90%",
    margin: "40px auto",
    padding: "30px 15px",
  },

  [theme.breakpoints.down("sm")]: {
    height: "60vh",
    padding: "20px 10px",
  },
}));

const Container = styled(Box)(({ theme }) => ({
  textAlign: "center",

  "& img": {
    width: "18%",
    marginBottom: "20px",

    [theme.breakpoints.down("md")]: {
      width: "30%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "40%",
    },
  },

  "& h6": {
    marginTop: "10px",
    fontSize: "1.2rem",
    fontWeight: 600,
    color: "#ff6b9d",
  },

  "& p": {
    color: "#555",
    fontSize: "0.95rem",
    marginTop: "5px",
  },
}));

const StyledLinkText = styled(Typography)(({ theme }) => ({
  marginTop: "5px",
  fontSize: "0.95rem",
  color: "#c44569",
  cursor: "pointer",
  fontWeight: 500,
  transition: "0.3s",
  "&:hover": {
    color: "#ff6b9d",
    transform: "scale(1.05)",
  },
}));

const EmptyCart = () => {
const navigate = useNavigate();
  const imgurl =
    "https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90";

  return (
    <Component>
      <Container>
        <img src={imgurl} alt="empty cart" />
        <Typography variant="h6">Your Cart is Empty</Typography>
        <StyledLinkText onClick={()=> navigate('/')}>
          Add items to Cart
        </StyledLinkText>
      </Container>
    </Component>
  );
};

export default EmptyCart;