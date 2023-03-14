import { Router } from 'express';
import {authMiddleware, sessionValidation} from '../middlewares/index.js'
import { createHash, isValidPassword } from '../utils/index.js'
import mongoose from 'mongoose';
import {Usuarios} from '../dao/model/user.js'
const authRouter = Router();



authRouter.get('/login', sessionValidation, (req, res) => {
    res.render('login', {})
})

authRouter.post('/login', sessionValidation,  async (req, res) => {
    let user = req.body;
    let userFound = await Usuarios.findOne({ email: user.email })
    if(!userFound || !isValidPassword(userFound, user.password)){
        res.render('login-error', { user })
    }else{
        req.session.user = userFound.email;
        res.render('datos', { user: req.session.user })
    }

})

authRouter.get('/register', sessionValidation, (req, res) => {
    res.render('register', {})
})

authRouter.post('/register', sessionValidation,  async (req, res) => {
    const { first_name, last_name, age, email, password } = req.body;
    let newUser = {
        first_name,
        last_name,
        age,
        email,
        password: createHash(password)
    }
    try {
        let user = await Usuarios.findOne({ email: newUser.email })
        if(user){
            res.render('register-error', {})
        }
        const usuarioSaveModel = Usuarios(newUser)
        await usuarioSaveModel.save()
    } catch (error) {
        console.log(error)
        res.render('register-error', {})
    }
 
    res.render('login', { message: 'Registro exitoso', status: 'success' })
})

authRouter.get('/soloLogueados', authMiddleware, (req, res) => {
    res.render('datos', {})
})

authRouter.get('/logout', (req, res) => {
    req.session.destroy(error => {
        res.redirect('/auth/login')
    })
})

authRouter.get('/restaurarPassword', (req, res) => {
    res.render('restore-password', {})
})

authRouter.post('/restaurarPassword', sessionValidation,  async (req, res) => {
    let user = req.body;
    try {
        let userFound = await Usuarios.findOne({ email: user.email })
        if(!userFound){
            res.render('register', {})
        }else{
            let newPassword = createHash(user.password);
            let result = await Usuarios.updateOne({ email: user.email }, { $set: { password: newPassword }})
            res.render('login', {})
        }
    
    } catch (error) {
        console.log(error)
        res.render('register', {})
    }
   
  
})

export default authRouter;