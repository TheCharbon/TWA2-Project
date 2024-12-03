import express from 'express';

import { loginUser, createUser, validate } from '../controllers/auth.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/signup', createUser);
router.post('/validate', validate )


export default router;