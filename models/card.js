const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    link: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        default: [],
      },
    ],
    createdAt: { type: Date, default: Date.now },
  },

);

// cardSchema.statics.isOwner = function (cardId, userId) {
//   return this.findById(cardId)
//     .then((card) => {
//       if (card) {
//         return String(card.owner) === userId;
//       }
//       return Promise.reject(new Error('Запрашиваемая карточка не найдена.'));
//     });
// };

module.exports = mongoose.model('card', cardSchema);
