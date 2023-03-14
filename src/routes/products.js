import { Router } from 'express';
const router = Router();
import { productById, productDelete, productGet, productPost, productPut } from '../controller/productManagerDB.js';
import ProductManager from '../controller/productManager.js'
import { socketServer } from '../app.js';
const productManager = new ProductManager('product.json');


router.get('/', productGet);

router.get('/:pid', productById)

router.post('/', productPost)

router.delete('/:pid', productDelete)

router.put('/:pid', productPut)




export default router;