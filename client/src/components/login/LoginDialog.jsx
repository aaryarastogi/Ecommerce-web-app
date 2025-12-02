import React, { useContext, useState } from 'react'
import {Box, Button, Dialog, TextField, Typography, InputAdornment, IconButton, Fade} from '@mui/material'
import {styled} from '@mui/material'
import { authenticateSignUp  , authenticateLogin} from '../../service/api'
import { DataContext } from '../../context/DataProvider'
import { 
    Person, 
    Lock, 
    Email, 
    Phone, 
    Visibility, 
    VisibilityOff,
    ShoppingBag,
    ArrowBack,
    Close
} from '@mui/icons-material'

const Container=styled(Box)`
    height:75vh;
    width:95vh;
    max-width: 95vw;
    border-radius: 24px;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    animation: fadeIn 0.4s ease-in-out;
    box-sizing: border-box;
    position: relative;
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: scale(0.95);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    @media (max-width: 960px) {
        width: 90vw;
        max-width: 90vw;
        height: auto;
        max-height: 90vh;
        overflow-x: hidden;
        overflow-y: auto;
    }
    
    @media (max-width: 600px) {
        width: calc(100vw - 20px);
        max-width: calc(100vw - 20px);
        height: auto;
        max-height: 95vh;
        border-radius: 16px;
        overflow-x: hidden;
        overflow-y: auto;
    }
`
const Image=styled(Box)`
    background: linear-gradient(135deg, rgba(255, 107, 157, 0.25) 0%, rgba(196, 69, 105, 0.25) 100%);
    backdrop-filter: blur(20px);
    height:100%;
    width:35%;
    padding:50px 40px;
    color:white;
    font-weight:600;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-right: 1px solid rgba(255, 255, 255, 0.1);
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    flex-shrink: 0;
    
    &::before {
        content: '';
        position: absolute;
        top: -50%;
        right: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle, rgba(255, 107, 157, 0.1) 0%, transparent 70%);
        animation: pulse 4s ease-in-out infinite;
    }
    
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
            opacity: 0.5;
        }
        50% {
            transform: scale(1.1);
            opacity: 0.8;
        }
    }
    
    & > * {
        position: relative;
        z-index: 1;
    }
    
    @media (max-width: 960px) {
        width: 100%;
        height: auto;
        min-height: 200px;
        padding: 30px 25px;
        border-right: none;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        flex-shrink: 0;
        overflow-x: hidden;
    }
    
    @media (max-width: 600px) {
        padding: 25px 20px;
        min-height: 150px;
        overflow-x: hidden;
    }
`
const IconWrapper = styled(Box)`
    width: 80px;
    height: 80px;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 30px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    
    & svg {
        font-size: 40px;
        color: rgba(255, 255, 255, 0.9);
    }
`
const Wrapper=styled(Box)`
    display:flex;
    flex-direction:column;
    padding:45px 55px;
    flex:1;
    background: rgba(26, 31, 58, 0.85);
    backdrop-filter: blur(20px);
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */
    box-sizing: border-box;
    min-width: 0;
    max-width: 100%;
    
    &::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera */
    }
    
    & > div , & > button , & > p{
        margin-top:18px;
    }
    
    & .MuiTextField-root {
        margin-top: 20px;
        width: 100%;
        box-sizing: border-box;
        max-width: 100%;
        
        & .MuiInputBase-root {
            color: rgba(255, 255, 255, 0.95);
            font-size: 15px;
            padding: 8px 0;
            width: 100%;
            box-sizing: border-box;
            
            &::before {
                border-bottom: 1.5px solid rgba(255, 255, 255, 0.2);
            }
            
            &:hover::before {
                border-bottom: 1.5px solid rgba(255, 107, 157, 0.6);
            }
            
            &.Mui-focused::before {
                border-bottom: 2px solid rgba(255, 107, 157, 0.8);
            }
            
            &.Mui-focused::after {
                border-bottom: 2px solid rgba(255, 107, 157, 0.8);
            }
        }
        
        & .MuiInputLabel-root {
            color: rgba(255, 255, 255, 0.65);
            font-size: 14px;
            
            &.Mui-focused {
                color: rgba(255, 107, 157, 0.9);
            }
        }
        
        & .MuiInputAdornment-root {
            & .MuiSvgIcon-root {
                color: rgba(255, 255, 255, 0.5);
                font-size: 20px;
            }
        }
    }
    
    @media (max-width: 960px) {
        padding: 35px 40px;
        overflow-x: hidden;
    }
    
    @media (max-width: 600px) {
        padding: 25px 20px;
        overflow-x: hidden;
        overflow-y: auto;
    }
`
const LoginButton=styled(Button)({
    textTransform:'none',
    background: 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)',
    height:'54px',
    borderRadius:'12px',
    color:'#fff',
    fontSize: '16px',
    fontWeight: 600,
    boxShadow: '0 8px 30px rgba(255, 107, 157, 0.4)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    marginTop: '25px',
    "&:hover":{
        background: 'linear-gradient(135deg, #c44569 0%, #ff6b9d 100%)',
        transform: 'translateY(-2px)',
        boxShadow: '0 12px 40px rgba(255, 107, 157, 0.6)'
    },
    "&:active": {
        transform: 'translateY(0px)',
    }
})
    
const Text=styled(Typography)`
    font-size:12px;
    color:rgba(255, 255, 255, 0.55);
    line-height: 1.6;
    margin-top: 15px;
    word-wrap: break-word;
    overflow-wrap: break-word;
    max-width: 100%;
`
const CreateAccount=styled(Typography)`
    font-size:14px;
    text-align:center;
    font-weight:600;
    color:#ff6b9d;
    cursor:pointer;
    transition: all 0.2s ease;
    margin-top: 20px;
    padding: 8px;
    border-radius: 8px;
    word-wrap: break-word;
    overflow-wrap: break-word;
    max-width: 100%;
    
    &:hover {
        color: #c44569;
        background: rgba(255, 107, 157, 0.1);
        transform: scale(1.02);
    }
`
const BackToLogin=styled(Typography)`
    font-size:14px;
    text-align:center;
    font-weight:600;
    color:rgba(255, 255, 255, 0.7);
    cursor:pointer;
    transition: all 0.2s ease;
    margin-top: 15px;
    padding: 8px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    word-wrap: break-word;
    overflow-wrap: break-word;
    max-width: 100%;
    
    &:hover {
        color: #ff6b9d;
        background: rgba(255, 107, 157, 0.1);
    }
`
const Error = styled(Typography)`
    font-size:13px;
    color:#ff6b9d;
    line-height:1.6;
    margin-top:8px;
    font-weight:500;
    padding: 12px 16px;
    background: rgba(255, 107, 157, 0.1);
    border-left: 3px solid rgba(255, 107, 157, 0.8);
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
    animation: shake 0.4s ease-in-out;
    word-wrap: break-word;
    overflow-wrap: break-word;
    max-width: 100%;
    box-sizing: border-box;
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`
const Heading = styled(Typography)`
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 12px;
    background: linear-gradient(135deg, #fff 0%, rgba(255, 255, 255, 0.8) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    word-wrap: break-word;
    overflow-wrap: break-word;
    max-width: 100%;
`
const SubHeading = styled(Typography)`
    font-size: 15px;
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.6;
    margin-top: 8px;
    word-wrap: break-word;
    overflow-wrap: break-word;
    max-width: 100%;
`
const CloseButton = styled(IconButton)`
    position: absolute;
    top: 15px;
    right: 15px;
    z-index: 1000;
    color: rgba(255, 255, 255, 0.7);
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    width: 36px;
    height: 36px;
    transition: all 0.3s ease;
    
    &:hover {
        background: rgba(255, 107, 157, 0.2);
        border-color: rgba(255, 107, 157, 0.5);
        color: rgba(255, 255, 255, 0.9);
        transform: rotate(90deg);
    }
    
    & svg {
        font-size: 20px;
    }
    
    @media (max-width: 600px) {
        top: 10px;
        right: 10px;
        width: 32px;
        height: 32px;
        
        & svg {
            font-size: 18px;
        }
    }
`

const accountInitialValue={
    login:{
        view:'login',
        heading:"Login",
        subHeading:"Get access to your Orders, Wishlist and Recommendations"
    },
    signup:{
        view:'signup',
        heading:"Looks like you're new here!",
        subHeading:"Sign up with your mobile number to get started"
    }
}
const signUpInitialValues={
    firstname:'',
    lastname:'',
    username:'',
    email:'',
    password:'',
    phone:''
}
const loginInitialValues={
    username:'',
    password:''
}
const LoginDialog = ({open , setOpen}) => {
    const [account,toggleAccount]=useState(accountInitialValue.login);
    const[signUp,setSignUp]=useState(signUpInitialValues);
    const[login,setLogin]=useState(loginInitialValues);
    const[error,setError]=useState(false);
    const[showPassword,setShowPassword]=useState(false);

    const {setAccount, setUser}=useContext(DataContext);
    const handleClose=()=>{
        setOpen(false);
        toggleAccount(accountInitialValue.login);
        setError(false);
        setShowPassword(false);
    }
    const toggleSignup=()=>{
        toggleAccount(accountInitialValue.signup);
        setError(false);
    }
    const toggleLogin=()=>{
        toggleAccount(accountInitialValue.login);
        setError(false);
    }

    const onInputChange=(e)=>{
        setSignUp({...signUp , [e.target.name]:e.target.value});
        if(error) setError(false);
    }
    const signupUser=async()=>{
        let response = await authenticateSignUp(signUp);
        console.log(response);
        if(!response) {
            setError(true);
            return;
        }
        handleClose();
        setAccount(signUp.firstname);
        setUser({
            username: signUp.username,
            email: signUp.email,
            firstname: signUp.firstname
        });
    }

    const onValueChange=(e)=>{
        setLogin({...login,[e.target.name]:e.target.value});
        if(error) setError(false);
    }
    const loginUser=async()=>{
        let response=await authenticateLogin(login);
        console.log(response);
        if(response.status===200){
            handleClose();
            const userData = response.data.data;
            setAccount(userData.firstname);
            setUser({
                username: userData.username,
                email: userData.email,
                firstname: userData.firstname
            });
        }
        else{
            setError(true);
        }
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

  return (
    <Dialog 
        open={open} 
        onClose={handleClose} 
        PaperProps={{
            sx:{
                maxWidth:'unset',
                background: 'transparent',
                boxShadow: 'none',
                margin: { xs: '10px', sm: '20px' },
                maxHeight: { xs: '95vh', sm: '90vh' },
                width: { xs: 'calc(100% - 20px)', sm: 'auto' },
                overflowX: 'hidden'
            }
        }}
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 300 }}
        fullWidth
        maxWidth={false}
    >
        <Container>
            <CloseButton onClick={handleClose} aria-label="close">
                <Close />
            </CloseButton>
            <Box sx={{
                display:'flex',
                height:'100%',
                flexDirection: { xs: 'column', md: 'row' },
                width: '100%',
                boxSizing: 'border-box',
                minWidth: 0,
                overflowX: 'hidden',
                overflowY: { xs: 'auto', md: 'hidden' }
            }}>
            {/* leftpart */}
            <Image>
                <IconWrapper>
                    <ShoppingBag />
                </IconWrapper>
                <Heading>{account.heading}</Heading>
                <SubHeading>{account.subHeading}</SubHeading>
            </Image>
            {/* rightpart */}
            {
                account.view==='login' ? 
                <Wrapper>
                <Heading style={{fontSize: '26px', marginBottom: '8px', marginTop: '0'}}>Welcome Back</Heading>
                <SubHeading style={{marginBottom: '10px'}}>Sign in to continue to Cartify</SubHeading>
                
                <TextField 
                    variant='standard' 
                    onChange={(e)=>onValueChange(e)} 
                    name='username' 
                    label='Username'
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Person />
                            </InputAdornment>
                        ),
                    }}
                />
                
                {
                    error && (
                        <Error>
                            <Lock sx={{fontSize: '18px'}} />
                            Please enter valid username or password
                        </Error>
                    )
                }

                <TextField 
                    variant='standard' 
                    onChange={(e)=>onValueChange(e)} 
                    name='password' 
                    label='Password'
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Lock />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                    sx={{color: 'rgba(255, 255, 255, 0.5)'}}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <Text>By continuing, you agree to Cartify's Terms of Use and Privacy Policy.</Text>
                <LoginButton onClick={()=>loginUser()} fullWidth>Login</LoginButton>
                <CreateAccount onClick={()=>toggleSignup()}>New to Cartify? Create an account</CreateAccount>
            </Wrapper>
            :
            <Wrapper>
                <Heading style={{fontSize: '26px', marginBottom: '8px', marginTop: '0'}}>Create Account</Heading>
                <SubHeading style={{marginBottom: '10px'}}>Join Cartify and start shopping</SubHeading>
                
                <TextField 
                    variant='standard' 
                    onChange={(e)=>onInputChange(e)} 
                    name='firstname' 
                    label='First Name'
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Person />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField 
                    variant='standard' 
                    onChange={(e)=>onInputChange(e)} 
                    name='lastname' 
                    label='Last Name'
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Person />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField 
                    variant='standard' 
                    onChange={(e)=>onInputChange(e)} 
                    name='username' 
                    label='Username'
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Person />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField 
                    variant='standard' 
                    onChange={(e)=>onInputChange(e)} 
                    name='email' 
                    label='Email'
                    type='email'
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Email />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField 
                    variant='standard' 
                    onChange={(e)=>onInputChange(e)} 
                    name='password' 
                    label='Password'
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Lock />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                    sx={{color: 'rgba(255, 255, 255, 0.5)'}}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField 
                    variant='standard' 
                    onChange={(e)=>onInputChange(e)} 
                    name='phone' 
                    label='Phone Number'
                    type='tel'
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Phone />
                            </InputAdornment>
                        ),
                    }}
                />
                
                {
                    error && (
                        <Error>
                            <Lock sx={{fontSize: '18px'}} />
                            Please fill all fields correctly
                        </Error>
                    )
                }
                
                <LoginButton onClick={signupUser} fullWidth>Create Account</LoginButton>
                <BackToLogin onClick={()=>toggleLogin()}>
                    <ArrowBack sx={{fontSize: '18px'}} />
                    Back to Login
                </BackToLogin>
            </Wrapper>
            }
            </Box>
        </Container>
    </Dialog>
  )
}

export default LoginDialog