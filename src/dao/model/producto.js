import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const ProductoSchema = Schema({
    title: {
        type: String,
        required: [true, 'EL titulo es obligatorio']
    },
    description: {
        type: String, 
        required: [true, 'La descripcion es obligatoria']
    },
    price: {
        type: Number,
        required: [true, 'El precio es obligatorio']
    },
    thumbnail: {
        type: String
    },
    code: {
        type: String,
        required: [true, 'El codigo es obligatorio'],
        unique: true
    },
    stock: {
        type: Number,
        required: [true, 'EL stock es obligatorio']
    }
})

ProductoSchema.plugin(mongoosePaginate);



export const Producto = model('Producto', ProductoSchema);
