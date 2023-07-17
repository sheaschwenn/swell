const router = require('express').Router();
const userRoutes = require('./userRoutes');
const surfsRoutes = require('./surfsRoutes');

router.use('/user', userRoutes);
router.use('./surfs', surfsRoutes); 
