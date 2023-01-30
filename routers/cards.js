const router = require('express').Router();

const {
  getAllCards, createCard, deleteCard, putLike, deleteLike,
} = require('../controllers/cards');

const {
  validateCardCreate,
} = require('../middlewares/validation');

router.get('/', getAllCards);
router.post('/', validateCardCreate, createCard);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', putLike);
router.delete('/:cardId/likes', deleteLike);

module.exports = router;
