import React, { useContext, useState } from 'react'
import {Box, Button, Dialog, TextField, Typography} from '@mui/material'
import styled from '@emotion/styled'
import { authenticateSignUp  , authenticateLogin} from '../../service/api'
import { DataContext } from '../../context/DataProvider'

const Container=styled(Box)`
    height:70vh;
    width:90vh;
    border-radius: 24px;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.1);
`
const Image=styled(Box)`
    background: linear-gradient(135deg, rgba(255, 107, 157, 0.2) 0%, rgba(196, 69, 105, 0.2) 100%);
    backdrop-filter: blur(20px);
    height:83%;
    width:28%;
    padding:45px 35px;
    color:white;
    font-weight:600;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-right: 1px solid rgba(255, 255, 255, 0.1);
`
const Wrapper=styled(Box)`
    display:flex;
    flex-direction:column;
    padding:40px 50px;
    flex:1;
    background: rgba(26, 31, 58, 0.8);
    backdrop-filter: blur(20px);
    & > div , & > button , & > p{
        margin-top:20px;
    }
    & .MuiTextField-root {
        & .MuiInputBase-root {
            color: rgba(255, 255, 255, 0.9);
            &::before {
                border-bottom: 1px solid rgba(255, 255, 255, 0.3);
            }
            &:hover::before {
                border-bottom: 1px solid rgba(255, 107, 157, 0.5);
            }
        }
        & .MuiInputLabel-root {
            color: rgba(255, 255, 255, 0.6);
        }
    }
`
const LoginButton=styled(Button)({
    textTransform:'none',
    background: 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)',
    height:'52px',
    borderRadius:'15px',
    color:'#fff',
    fontSize: '17px',
    fontWeight: 600,
    boxShadow: '0 8px 30px rgba(255, 107, 157, 0.4)',
    transition: 'all 0.3s ease',
    "&:hover":{
        background: 'linear-gradient(135deg, #c44569 0%, #ff6b9d 100%)',
        transform: 'translateY(-3px)',
        boxShadow: '0 12px 40px rgba(255, 107, 157, 0.5)'
    }
})
    
const RequestOTPButton=styled(Button)`
    text-transform:none;
    background:rgba(255, 255, 255, 0.05);
    height:48px;
    border-radius:15px;
    color:white;
    border: 2px solid rgba(255, 107, 157, 0.3);
    box-shadow:0 4px 15px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
    &:hover {
        background: rgba(255, 107, 157, 0.1);
        border-color: rgba(255, 107, 157, 0.5);
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(255, 107, 157, 0.3);
    }
`
const Text=styled(Typography)`
    font-size:12px;
    color:rgba(255, 255, 255, 0.6);
`
const CreateAccount=styled(Typography)`
    font-size:14px;
    text-align:center;
    font-weight:600;
    color:#ff6b9d;
    cursor:pointer;
    transition: all 0.2s ease;
    &:hover {
        color: #c44569;
        transform: scale(1.05);
    }
`
const Error = styled(Typography)`
    font-size:12px;
    color:#ff6b9d;
    line-height:1.5;
    margin-top:10px;
    font-weight:600;
    padding: 10px;
    background: rgba(255, 107, 157, 0.1);
    border: 1px solid rgba(255, 107, 157, 0.3);
    border-radius: 12px;
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

    const {setAccount, setUser}=useContext(DataContext);
    const handleClose=()=>{
        setOpen(false);
        toggleAccount(accountInitialValue.login);
        setError(false);
    }
    const toggleSignup=()=>{
        toggleAccount(accountInitialValue.signup);
    }

    const onInputChange=(e)=>{
        setSignUp({...signUp , [e.target.name]:e.target.value});
    }
    const signupUser=async()=>{
        let response = await authenticateSignUp(signUp);
        console.log(response);
        if(!response) return;
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

  return (
    <Dialog open={open} onClose={handleClose} PaperProps={{sx:{maxWidth:'unset'}}}>
        <Container>
            <Box style={{display:'flex',height:'100%'}}>
            {/* leftpart */}
            <Image>
                <Typography variant='h5'>{account.heading}</Typography>
                <Typography styled={{marginTop:20}}>{account.subHeading}</Typography>
            </Image>
            {/* rightpart */}
            {
                account.view==='login' ? 
                <Wrapper>
                <TextField variant='standard' onChange={(e)=>onValueChange(e)} name='username' label='Enter Username'></TextField>
                
                {
                    error && <Error>Please Enter valid username or password</Error>
                }

                <TextField variant='standard' onChange={(e)=>onValueChange(e)} name='password' label='Enter Password' type='password'></TextField>
                <Text>By continuing, you agree to Cartify's Terms of Use and Privacy Policy.</Text>
                <LoginButton onClick={()=>loginUser()}>Login</LoginButton>
                <Typography style={{textAlign:'center'}}>OR</Typography>
                <RequestOTPButton>Request OTP</RequestOTPButton>
                <CreateAccount onClick={()=>toggleSignup()}>New to Cartify? Create an account</CreateAccount>
            </Wrapper>
            :
            <Wrapper>
                <TextField variant='standard' onChange={(e)=>onInputChange(e)} name='firstname' label='Enter Firstname'></TextField>
                <TextField variant='standard' onChange={(e)=>onInputChange(e)} name='lastname' label='Enter Lastname'></TextField>
                <TextField variant='standard' onChange={(e)=>onInputChange(e)} name='username' label='Enter Username'></TextField>
                <TextField variant='standard' onChange={(e)=>onInputChange(e)} name='email' label='Enter Email'></TextField>
                <TextField variant='standard' onChange={(e)=>onInputChange(e)} name='password' label='Enter Password' type='password'></TextField>
                <TextField variant='standard' onChange={(e)=>onInputChange(e)} name='phone' label='Enter Phone'></TextField>
                <LoginButton onClick={signupUser}>Continue</LoginButton>
            </Wrapper>
            }
            </Box>
        </Container>
    </Dialog>
  )
}

export default LoginDialog