import { Box } from '@mui/material';
//components
import Header from './components/header/Header';
import Home from './components/Home/Home';
import DataProvider from './context/DataProvider';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import DetailView from './components/Details/DetailView';
import Cart from './components/cart/Cart';
import PaymentSuccess from './components/payment/PaymentSuccess';
import axios from 'axios';


function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <Header/>
        <Box style={{marginTop:'54px'}}>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/product/:id' element={<DetailView/>} />
            <Route path='/cart' element={<Cart amount={3000}/>} />
            <Route path='/paymentsuccess' element={<PaymentSuccess/>}/>
          </Routes>
        </Box>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
