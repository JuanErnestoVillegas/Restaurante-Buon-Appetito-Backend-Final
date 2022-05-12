const {Router} = require('express');
const { login, addUser, getAuth, getUser, getUsers, getPassByEmail, deleteUser, updateUser, mailCons, mailSus} = require('../controllers/users');
const { verifyToken } = require('../middlewares/auth');

const router = Router();

router.post('/login', login);
router.post('/', addUser);
router.get('/auth',verifyToken, getAuth);
router.get("/", getUsers );
router.get("/user/:id", getUser );
router.post("/recover", getPassByEmail );
router.post("/mailcons", mailCons ); 
router.post("/mailsus", mailSus ); 
router.delete('/:id', verifyToken, deleteUser)
router.put('/:id', verifyToken, updateUser)

module.exports= router;

