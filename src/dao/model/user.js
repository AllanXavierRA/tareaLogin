import {Schema, model} from 'mongoose';

const UsuarioSchema = new Schema({
    first_name: String,
    last_name: String,
    email: { type: String, unique: true },
    age: Number,
    password: String
})
export const Usuarios = model('Usuarios', UsuarioSchema)

