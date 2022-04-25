const jwt = require('jsonwebtoken')

exports.verifyToken = (req,res,next)=>{
  try {
    const token = req.header('x-auth-token');
    if(!token){
      return res.status(400).json({ok:false, message:'Credenciales no válidas.'})
    }
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = payload.id;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ok:false,message:'Token no válido.'})
  }
}

//MENSAJE HTTP
// METHOD: 
// HEAD: token
// BODY: