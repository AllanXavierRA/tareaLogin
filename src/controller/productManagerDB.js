import { request, response } from "express";
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { Producto } from "../dao/model/producto.js";




const productPost = async( req=request, res=response ) => {
    const body = req.body;
    

    const producto = new Producto(body);

    await producto.save();

    res.json({
        producto
    })

}

const productGet = async ( req=request, res=response) => {
    const {page = 1, limit = 10, sort} = req.query;

    let ascendente
    if(sort === 'asc'){
        ascendente = 1;
    }else if(sort === 'desc'){
        ascendente = -1;
    }

    const options = {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        sort: {price: ascendente}
    }


    try {
        const {totalPages, prevPage, nextPage, page, hasPrevPage, hasNextPage, prevLink, nextLink, docs } = await Producto.paginate({}, options)

        res.json({

            status: 'success',
            payload: docs,
            totalPages,
            prevPage,
            nextPage,
            page,
            hasPrevPage,
            hasNextPage,
            prevLink,
            nextLink,
                    
        })

    } catch (error) {
        res.json({

        
        status:'error',
        payload: [],
        
    })
    }
    

    
    
}



const productById = async(req=request, res=response) => {

    const {pid} = req.params;


    if (!mongoose.Types.ObjectId.isValid(pid)) {
        return res.status(400).json({ message: 'El ID del producto no es válido' });
      }

    const product = await Producto.findById(pid);

    if(product === null){
        return res.status(404).json({message: 'Producto no encontrado'})

    }

    res.json({
        product
    })


}

const productDelete = async( req=request, res=response ) => {
    const {pid} = req.params;

    if (!mongoose.Types.ObjectId.isValid(pid)) {
        return res.status(400).json({ message: 'El ID del producto no es válido' });
    }

    const product = await Producto.findByIdAndDelete(pid)

    if(product === null){
        return res.status(404).json({message: 'Producto no encontrado'})
    }


    res.json({
        product
    })
}

const productPut = async(req=request, res=response) => {
    const {pid} = req.params;
    const {title, description, price, thumbnail, stock} = req.body;

    if (!mongoose.Types.ObjectId.isValid(pid)) {
        return res.status(400).json({ message: 'El ID del producto no es válido' });
    }

    const product =  await Producto.findByIdAndUpdate( pid, {title, description, price, thumbnail, stock}, {new: true})

    if(product === null){
        return res.status(404).json({message: 'Producto no encontrado'})
    }

    res.json({
        product
    })

}

export {
    productPost,
    productGet,
    productDelete,
    productById,
    productPut
}