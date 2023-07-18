import { products } from "./constants/data.js"
import Product from "./model/product-schema.js";

const defaultData= async() => {
  try {
    await Product.insertMany(products);
    console.log('product inserted successfully');
  } catch (error) {
    console.log('error while inserting default data',error.message);
  }
}
export default defaultData; 
