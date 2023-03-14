import { request, response } from "express";
import mongoose from "mongoose";
import { ObjectId } from 'mongodb';
import { Cart } from "../dao/model/cart.js"


const cartPost = async( req = request, res = response) => {
    const body = req.body;

    const cart = new Cart(body);
    await cart.save();


    res.json({
        cart
    })
}  



const cartGet = async( req=request, res=response) => {

    const {cid} = req.params;
    const cart = await Cart.findById( cid ).populate('products.id');

    res.json({
        cart
    })
}


const postProductToCart = async( req=request, res=response ) => {

    const {cid, pid} = req.params;
    

    
    if (!mongoose.Types.ObjectId.isValid(cid)) {
        return res.status(400).json({ message: 'El ID del carrito no es válido' });
    }else if(!mongoose.Types.ObjectId.isValid(pid)){
        return res.status(400).json({ message: 'El ID del producto no es válido'})
    }

    const cart = await Cart.findById(cid);

    if (!cart) {
        return res.status(404).json({ message: "Carrito no encontrado" });
    }

    const productIndex = cart.products.findIndex(p => p.id.equals(new ObjectId(pid)));

    if(productIndex !== -1){
        cart.products[productIndex].quantity += 1;
    }else{

        cart.products.push({ id: pid, quantity: 1});
    }


    await cart.save();

    res.json({
        cart
    })
}


const cartDelete = async ( req=request, res=response ) => {

    const {cid, pid} = req.params;

    if (!mongoose.Types.ObjectId.isValid(cid)) {
        return res.status(400).json({ message: 'El ID del carrito no es válido' });
    }else if(!mongoose.Types.ObjectId.isValid(pid)){
        return res.status(400).json({ message: 'El ID del producto no es válido' })
    }

    const cart = await Cart.findByIdAndUpdate( cid, { $pull: {products: pid}}, {new: true});

    if(!cart){
        return res.status(400).json({message: "Carrito no encontrado"})
    }

    res.json({
        cart
    })

}


const cartDeleteProducts = async ( req=request, res=response ) => {

    const {cid} = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(cid)){
        return res.status(400).json({message: 'El ID del carrito no es válido'})
    }

    const cart = await Cart.findByIdAndUpdate( cid, { $set: {products: []}}, {new: true})

    if(!cart){
        return res.status(400).json({message: "Carrito no encontrado"})
    }

    res.json({
        cart
    })

}

export {
    cartPost,
    cartGet,
    postProductToCart,
    cartDelete,
    cartDeleteProducts
}

