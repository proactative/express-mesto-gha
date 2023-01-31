const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');
const ValidationError = require('../errors/validation-error');
const ConflictError = require('../errors/conflict-error');
const UnauthorisedError = require('../errors/unauthorized-error');

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorisedError({ message: 'Неправильные почта или пароль.' }); // ошибка при проверке почты
      }
      return { matched: bcrypt.compare(password, user.password), user };
    })
    .then(({ matched, user }) => {
      if (!matched) {
        throw new UnauthorisedError({ message: 'Неправильные почта или пароль' }); // ошибка при проверке пароля
      }
      const token = jwt.sign(
        { _id: user._id },
        'some-secret-key',
        { expiresIn: '7d' },
      );
      return res.send({ token });
    })
    .catch(next);
};

const getAllUsers = (req, res, next) => {
  User.find({})
    .then((data) => res.send(data))
    .catch(next);
};

const getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        return res.send(user);
      }
      throw new NotFoundError({ message: 'Запрашиваемый пользователь не найден.' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new ValidationError({ message: 'Переданы некорректные данные пользователя.' });
      }
      return next(err);
    });
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send(user))
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
      _id: user._id,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Пользователь с такой почтой уже зарегистрирован.'));
      }
      if (err.name === 'ValidationError') {
        throw new ValidationError({ message: 'Переданы некорректные данные пользователя.' });
      }
      return next(err);
    });
};

// for updating user & avatar
const updateUser = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (user) {
        return res.send(user);
      }
      throw new NotFoundError({ message: 'Запрашиваемый пользователь не найден.' });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        throw new ValidationError({ message: 'Переданы некорректные данные пользователя.' });
      }
      return next(err);
    });
};

module.exports = {
  getAllUsers, getUserById, createUser, updateUser, login, getCurrentUser,
};
