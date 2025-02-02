import React, { useContext, useState } from 'react'
import {Box, Button, Dialog, TextField, Typography} from '@mui/material'
import styled from '@emotion/styled'
import { authenticateSignUp  , authenticateLogin} from '../../service/api'
import { DataContext } from '../../context/DataProvider'

const Container=styled(Box)`
    height:70vh;
    width:90vh;
`
const Image=styled(Box)`
    background:#434242;
    height:83%;
    width:28%;
    padding:45px 35px;
    color:white;
    font-weight:600;
`
const Wrapper=styled(Box)`
    display:flex;
    flex-direction:column;
    padding:25px 35px;
    flex:1;
    & > div , & > button , & > p{
        margin-top:20px;
    }
`
const LoginButton=styled(Button)({
    textTransform:'none',
    background:'#FB641B',
    height:'48px',
    borderRadius:'2px',
    color:'#fff',
    "&:hover":{
        backgroundColor:"#ff6905"
    }
})
    
const RequestOTPButton=styled(Button)`
    text-transform:none;
    background:#fff;
    height:48px;
    border-radius:2px;
    color:#2874f0;
    box-shadow:0 2px 4px 0 rgb(0 0 0/ 20%);
`
const Text=styled(Typography)`
    font-size:12px;
    color:#878787;
`
const CreateAccount=styled(Typography)`
    font-size:14px;
    text-align:center;
    font-weight:600;
    color:#2874f0;
    cursor:pointer;
`
const Error = styled(Typography)`
    font-size:10px;
    color:#ff6161;
    line-height:0;
    margin-top:10px;
    font-weight:600;
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

    const {setAccount}=useContext(DataContext);
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
    }

    const onValueChange=(e)=>{
        setLogin({...login,[e.target.name]:e.target.value});
    }
    const loginUser=async()=>{
        let response=await authenticateLogin(login);
        console.log(response);
        if(response.status===200){
            handleClose();
            setAccount(response.data.data.firstname);
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