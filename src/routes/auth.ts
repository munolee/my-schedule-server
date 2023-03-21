import express from 'express';
import { authLogin, authLogout, authLogInCheck } from '../controllers/AuthController';
import { isNotLoggedIn, isLoggedIn } from '../middlewares/auth';

const authJwt = require('../middlewares/authJwt');

const router = express.Router();

router.post('/login', isNotLoggedIn, authLogin);
router.post('/logout', authJwt, authLogout);
router.get('/login', isLoggedIn, authLogInCheck);

module.exports = router;
