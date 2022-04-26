const {Router} = require('express');
const { login, addUser, getAuth, getUser, getUsers, deleteUser, updateUser} = require('../controllers/users');
const { verifyToken } = require('../middlewares/auth');

const router = Router();

router.post('/login', login);
router.post('/', addUser);
router.get('/auth',verifyToken, getAuth);
router.get("/", getUsers );
router.get("/user/:id", getUser );
router.delete('/', deleteUser);
router.put('/:id', verifyToken, updateUser)

module.exports= router;

