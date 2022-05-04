const Product = require("../models/Product");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.getProducts = async (req, res)=>{
    try {
         const products = await Product.find();
         res.status(200).json({ ok: true, products: products });
    } catch (error) {
        console.log(error);
        res.status(400).json({ok:false, mensaje:"Ocurrio un Error"})
    }
}

exports.addProduct = async (req, res) =>{
    try {
        const newProduct = new Product(req.body);
       const productadd = await newProduct.save();
       res.status(201).json({ok:true, productadd: productadd })
    } catch (error) {
        console.log(error);
        res.status(400).json({ok:false, mensaje:"Ocurrio un Error"})
    }
}

exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    await Product.findByIdAndDelete(id);
    res.status(200).json({ ok: true, mensaje: "Producto Eliminado" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ ok: false, mensaje: "Ocurrio un Error" });
}
};

exports.getProduct = async (req, res) => {
  try {
      const id = req.params.id;
      const product = await Product.findById(id);
      res.status(200).json({ ok: true, product: product });
    } catch (error) {
    console.log(error);
    res.status(400).json({ ok: false, mensaje: "Ocurrio un Error" });
  }
};

exports.updateProduct = async (req, resp) => {
  try {
    const id = req.params.id;
    await Product.findByIdAndUpdate(id, req.body);
    resp.status(200).json({ ok: true, message: "Producto Modificado" });
  } catch (error) {
    resp.status(400).json({ ok: false, mensaje: "Ocurrio un Error" });
  }
};
