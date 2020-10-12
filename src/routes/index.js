const express = require('express');
const router = express.Router();
const portoRouter = require('./portos');
const teamRouter = require('./teams');
const categoryRouter = require('./categories');
const authRouter = require('./auths');

router.use('/auth', authRouter);
router.use('/porto', portoRouter);
router.use('/team', teamRouter);
router.use('/category', categoryRouter);

module.exports = router;