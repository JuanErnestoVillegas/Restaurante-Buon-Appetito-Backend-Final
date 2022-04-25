const {Router} = require ("express");
const { getProduct, addProduct, deleteProduct, getProducts } = require("../controllers/products");
const { verifyToken } = require("../middlewares/auth");
const router = Router();

router.get("/", getProducts )
router.get("/product/:id", getProduct )
router.post("/", addProduct)
router.delete("/:id", deleteProduct)


module.exports = router;