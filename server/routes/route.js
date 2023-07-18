import express from 'express'
import { userSignup , userLogin } from '../controller/user-controller.js';
import { getProducts , getProductById } from '../controller/product-controller.js';
import { checkout , paymentVerification} from '../controller/payment-controller.js';

const router=express.Router();
router.post('/signup',userSignup);
router.post('/login',userLogin);

//products fetch from database
router.get('/products',getProducts);
router.get('/product/:id', getProductById);

//payment api 
// router.post('/payment', addPaymentGateway);
// router.post('/callback', paytmResponse);

router.route("/api/checkout").post(checkout);
router.route("/api/paymentverification").post(paymentVerification)

export default router;