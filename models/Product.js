const { Schema, model } = require("mongoose");

const ProductSchema = new Schema({
    name: {
      type: String,
      trim: true,
      required: true,
    },
    description:{
        type: String,
        required: true,
        trim: true
    },
    price:{
        type: Number,
        required: true,
        trim: true
    }},
  {
      versionKey: false,
  })
    
module.exports = model("Product", ProductSchema);
