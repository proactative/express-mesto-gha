const router = require('express').Router();

const {
  getAllUsers,
  getUserById,
  updateUser,
  getCurrentUser,
} = require('../controllers/users');

const {
  validateProfileUpdate,
  validateAvatarUpdate,
} = require('../middlewares/validation');

router.get('/', getAllUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', getUserById);
router.patch('/me', validateProfileUpdate, updateUser);
router.patch('/me/avatar', validateAvatarUpdate, updateUser);

module.exports = router;
