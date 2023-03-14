import { Schema, model } from "mongoose";


const CartSchema =  new Schema({
    products: [{
        _id: false,
        id: {
            type: Schema.Types.ObjectId,
            ref: 'Producto'
        },
        quantity: {
            type: Number
        }
    }]
})
  

export const Cart = model('Cart', CartSchema)


























