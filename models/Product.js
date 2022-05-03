const { Schema, model } = require("mongoose");

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
  },
  {
    versionKey: false,
  }
);
    
module.exports = model("Product", ProductSchema);

