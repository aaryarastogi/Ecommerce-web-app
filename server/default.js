import { products } from "./constants/data.js"
import Product from "./model/product-schema.js"

const DefaultData = async () => {
    try {
        for (let product of products) {
            await Product.findOneAndUpdate({ id: product.id }, product, { upsert: true, new: true });
            console.log(`Synchronized product: ${product.id}`);
        }
        console.log('Data imported Successfully');
    } catch (error) {
        console.log('Error while inserting default data', error.message);
    }
}

export default DefaultData;
