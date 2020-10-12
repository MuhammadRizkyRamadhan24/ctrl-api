const express = require('express');
const router = express.Router();
const upload = require('../helpers/uploadImage');
const uploadImage = upload.single('image_member');
const teamController = require('../controllers/teamController');
const authMiddleware = require('../middlewares/auth');

router.get('/', teamController.getAllTeam);
router.get('/search', teamController.getSeacrhTeam);
router.get('/:id', teamController.getTeamById);
router.post('/', authMiddleware.verifyJwtToken, uploadImage ,teamController.postTeam);
router.put('/:id', authMiddleware.verifyJwtToken, uploadImage ,teamController.putTeam);
router.delete('/:id', authMiddleware.verifyJwtToken, teamController.deleteTeam);

module.exports = router;