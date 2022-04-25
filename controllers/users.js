const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./../models/User');

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
    const token = jwt.sign({id:user._id},process.env.SECRET_KEY,{expiresIn:'10h'});
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
    // const idPorParams = req.params.id;
    const userXEmail = await User.findOne({email:req.body.email})
    const user = await User.findById(idPorParams);
    res.status(200).json({xId:user,xEmail:userXEmail})
  } catch (error) {
    console.log(error);
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
    const id = req.body.id;
    console.log(id);
    await User.findByIdAndDelete(id);
    res.status(200).json({ ok: true, mensaje: "El usuario fue borrado correctamente" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ ok: false, mensaje: "Ocurrio un Error" });
  }
}

//! ACTUALIZAR USUARIO
exports.updateUser = async (req,res) =>{
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //     return res.status(400).json({ errors: errors.array });
  // }
  try {
    const userUpdated=req.body
    const newData = await User.findByIdAndUpdate(req.params.id, userUpdated, { new: true }).select('-password')
    return res.status(200).json(newData)
  } catch (error) {
    console.log(error);
res.status(400).json({ msg: "Error en la solicitud." })
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
    res.status(200).json({ ok: true, user: user });
  } catch (error) {
  console.log(error);
  res.status(400).json({ ok: false, mensaje: "Ocurrio un Error" });
}
};

