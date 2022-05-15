const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./../models/User');
const mail = require('./../helpers/mail');

//! LOGIN
exports.login = async (req, res)=>{
  try {
    const user = await User.findOne({email:req.body.email});
    if(!user){
      return res.status(400).json({ok:false, message:'El usuario no existe.'});
    }
    const passwordCheck = await bcrypt.compare(req.body.password, user.password);
    if(!passwordCheck){
      return res.status(400).json({ok:false, message:'Credenciales incorrectas.'});
    }
    const token = jwt.sign({id:user._id},process.env.SECRET_KEY,{expiresIn:'20h'});
    res.status(200).json({ok:true, token:token});
  } catch (error) {
    console.log(error);
    res.status(401).json({mensaje:'Credenciales no válidas.'})
  }
}

//! AGREGAR USUARIO
exports.addUser = async (req,res) =>{
  try {
    console.log(req.body);
    const {password} = req.body;
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      ...req.body,
      password:encryptedPassword
    });
    const useradd = await newUser.save();    
    res.status(201).json({ok:true, useradd: useradd})
  } catch (error) {
    console.log(error);
    res.status(400).json({ok:false, message:'Ha ocurrido un error...'})
  }
}

//! AUTORIZAR USUARIO
exports.getAuth = async (req,res)=>{
  try {
    const id = req.userId;
    const user = await User.findById(id).select('-password');
    res.status(200).json({ok:true, user:user});    
    } catch (error) {
    console.log(error);
    res.status(400).json({ok:false, message:'Ha ocurrido un error'})
  }
}

//! BUSCAR USUARIO POR ID
exports.getUserById = async (req, res) =>{
  try {
    // const idPorBody = req.body.id;
    // const idPorQuery = req.query.id;
    const idPorParams = req.params.id;
    const userXEmail = await User.findOne({email:req.body.email})
    const user = await User.findById(idPorParams);
    res.status(200).json({xId:user,xEmail:userXEmail})
  } catch (error) {
    console.log(error);
  }
}



//! BUSCAR USUARIO POR EMAIL
exports.getPassByEmail = async (req, res) =>{
    try {
      console.log(req.body);
    const user = await User.findOne({email: req.body.email});
    if(!user){
         return res.status(400).json({ok:false, message:'El usuario no existe.', isEmailExist: false});
    } else{
           console.log('usuario existente');      
          const salt = await bcrypt.genSalt(10);
          randomNum=String(Math.floor(Math.random()*(99999999-1 + 1))+1); //end=99999999  start=1           
          const encryptedPassword = await bcrypt.hash(randomNum, salt);
          newpassword = encryptedPassword;   
          await User.findByIdAndUpdate(user._id, {password: newpassword});   
          mail({email: req.body.email, nombre: user.name, asunto: 'recover', password: randomNum});
          res.status(200).json({ok:true, message:'El email fue enviado.',  isEmailExist: true});
                    
        }   
  } catch (error) {
    console.log(error);
    return res.status(400).json({ok:false, message:'El usuario no existe.', isEmailExist: false});
  }
}

//! EMAIL AL USUARIO CONSULTA
exports.mailCons = async (req, res) =>{
  try {
      mail({email: req.body.email, nombre: req.body.name, asunto: 'cons', message: req.body.message});
      res.status(200).json({ok:true, message:'El email fue enviado.',  isEmailSend: true}); 
  } catch (error) {
    console.log(error);
    return res.status(400).json({ok:false, message:'Error.', isEmailSend: false});
  }
}

//! EMAIL AL USUARIO AL SUSCRIBIRSE
exports.mailSus = async (req, res) =>{
  try {
      mail({email: req.body.email, nombre: req.body.name, asunto: 'sus'});
      res.status(200).json({ok:true, message:'El email fue enviado.',  isEmailSend: true}); 
  } catch (error) {
    console.log(error);
    return res.status(400).json({ok:false, message:'Error.', isEmailSend: false});
  }
}

//! BUSCAR USUARIO POR NOMBRE
exports.getUsersByName = async (req, res) =>{
  try {
    const name = req.body.name;
    const users = await User.find({name:name});
    res.status(200).json(users)
  } catch (error) {
    console.log(error);    
  }
}

//! ELIMINAR USUARIO
exports.deleteUser = async (req,res) =>{
  try {
    const id = req.params.id;    
    await User.findByIdAndDelete(id);
    res.status(200).json({ ok: true, mensaje: "El usuario fue borrado correctamente" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ ok: false, mensaje: "Ocurrio un Error" });
  }
}

//! ACTUALIZAR USUARIO
exports.updateUser = async (req,res) =>{
  try {
    const userUpdated=req.body;
    const newData = await User.findByIdAndUpdate(req.params.id, userUpdated, { new: true }).select('-password')
    return res.status(200).json(newData);
  } catch (error) {
    console.log(error);
  res.status(400).json({ok:false, message: "Error en la solicitud." });
  }
}


//! BUSCAR USUARIOS
exports.getUsers = async (req, res)=>{
  try {
       const users = await User.find();
       res.status(200).json({ ok: true, users: users });
  } catch (error) {
      console.log(error);
      res.status(400).json({ok:false, mensaje:"Ocurrio un Error"})
  }
}

//! BUSCAR USUARIO SEGUN ID
exports.getUser = async (req, res) => {
try {
    const id = req.params.id;
    const user = await User.findById(id);
    console.log(user);
    res.status(200).json({ ok: true, user: user });
  } catch (error) {
  console.log(error);
  res.status(400).json({ ok: false, mensaje: "Ocurrio un Error" });
}
};

