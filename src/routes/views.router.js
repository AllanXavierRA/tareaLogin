import express from "express";
import ProductManager from '../controller/productManager.js'
const productManager = new ProductManager('product.json');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('home', {})
})

router.get('/realtimeproducts', (req, res) => {
    res.render('realtimeproducts');
  });
  
export default router



