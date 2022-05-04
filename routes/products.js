const {Router} = require ("express");
const { getProduct, addProduct, deleteProduct, getProducts, updateProduct } = require("../controllers/products");
const router = Router();

router.get("/", getProducts )
router.get("/product/:id", getProduct )
router.post("/", addProduct)
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct)


module.exports = router;