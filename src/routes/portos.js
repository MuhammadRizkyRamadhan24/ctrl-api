const express = require('express');
const router = express.Router();
const upload = require('../helpers/uploadImage');
const uploadImage = upload.single('image_project');
const portoController = require('../controllers/portoController');
const authMiddleware = require('../middlewares/auth');

router.get('/', portoController.getAllPorto);
router.get('/search', portoController.getSeacrhPorto);
router.get('/:id', portoController.getPortoById);
router.post('/', authMiddleware.verifyJwtToken, uploadImage ,portoController.postPorto);
router.put('/:id', authMiddleware.verifyJwtToken, uploadImage ,portoController.putPorto);
router.delete('/:id', authMiddleware.verifyJwtToken, portoController.deletePorto);



module.exports = router;