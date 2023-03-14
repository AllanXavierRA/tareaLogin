import { Router } from "express";
const router = Router();
import { cartPost, cartGet, postProductToCart, cartDelete, cartDeleteProducts } from "../controller/cartManagerDB.js";


router.post('/', cartPost);

router.get('/:cid', cartGet);

router.post('/:cid/product/:pid', postProductToCart); //Agregar producto al carrito

router.delete('/:cid/product/:pid', cartDelete); //Elimina un producto del carrito

router.delete('/:cid', cartDeleteProducts)

export default router