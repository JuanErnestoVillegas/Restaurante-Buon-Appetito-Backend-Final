const {Schema, model} = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')
const UserSchema = new Schema({
    name:{
    type: String,
    trim:true,
    required:true,
    minlength:3,
    maxlength:15
  },
  lastname:{
    type:String,
  },
  email:{
    type:String,
    trim:true,
    required:true,
    unique:true
  },
  password:{
    type:String,
    trim:true,
    required:true,
  },
  role:{
    type:String,
    enum:['USER','ADMIN'],
    default:'USER'
  }
},{
  versionKey:false,
  timestamps:true
});

UserSchema.plugin(uniqueValidator,{
  message:'{PATH} debe ser unico'
})

module.exports= model('User', UserSchema);