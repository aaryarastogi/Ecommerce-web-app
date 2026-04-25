import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Drawer,
  styled,
  Typography,
  IconButton,
  List,
  ListItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Search from "./Search";
import CustomButtons from "./CustomButtons";
import LoginDialog from "../login/LoginDialog";
import { Link } from "react-router-dom";

const StyledHeader = styled(AppBar)`
  background: rgba(10, 14, 39, 0.8);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  height: 80px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
`;

const LogoText = styled(Link)`
  text-decoration: none;
  color: inherit;
  font-weight: 800;
  font-size: 28px;
  letter-spacing: -1px;
  background: linear-gradient(135deg, #ff6b9d 0%, #c44569 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    filter: brightness(1.2);
  }

  /* add spacing so it's not stuck with search bar */
  margin-right: 40px;

  @media (max-width: 900px) {
    font-size: 22px;
    margin-right: 20px;
  }
`;

const CustomButtonWrapper = styled(Box)(({ theme }) => ({
  margin: "0 5% 0 auto",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const MenuButton = styled(IconButton)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down("md")]: {
    display: "block",
  },
}));

const MobileDrawerBox = styled(Box)`
  width: 300px;
  background: #0a0e27;
  height: 100%;
  color: white;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
`;

const DrawerHeader = styled(Box)`
  display: flex;
  align-items: center;
  padding: 25px 20px;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  background: rgba(255, 255, 255, 0.02);
`;

const Header = () => {
  const [open, setOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <StyledHeader position="sticky" elevation={0}>
      <Toolbar
        sx={{
          minHeight: "80px",
          px: { xs: 2, md: 5 },
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Mobile Menu Button */}
        <MenuButton color="inherit" onClick={handleOpen}>
          <MenuIcon />
        </MenuButton>

        {/* Drawer for Mobile */}
        <Drawer 
          open={open} 
          onClose={handleClose}
          PaperProps={{
            sx: {
              background: 'transparent',
              boxShadow: 'none'
            }
          }}
        >
          <MobileDrawerBox>
            <DrawerHeader>
              <LogoText to="/" onClick={handleClose} style={{ margin: 0 }}>
                Cartify
              </LogoText>
              <IconButton onClick={handleClose} color="inherit">
                <CloseIcon />
              </IconButton>
            </DrawerHeader>
            <Box sx={{ padding: '20px' }}>
              <List sx={{ width: '100%' }}>
                <ListItem disablePadding>
                  <CustomButtons closeDrawer={handleClose} setLoginOpen={setLoginOpen} />
                </ListItem>
              </List>
            </Box>
          </MobileDrawerBox>
        </Drawer>

        {/* Logo */}
        <LogoText to="/">
          Cartify
        </LogoText>

        {/* Search Bar */}
        <Box sx={{ flexGrow: 1, maxWidth: { xs: "100%", md: "45%" } }}>
          <Search />
        </Box>

        {/* Desktop Buttons */}
        <CustomButtonWrapper>
          <CustomButtons setLoginOpen={setLoginOpen} />
        </CustomButtonWrapper>
        
        <LoginDialog open={loginOpen} setOpen={setLoginOpen} />
      </Toolbar>
    </StyledHeader>
  );
};

export default Header;