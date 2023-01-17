const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const routerUsers = require('./routers/users');
const routerCards = require('./routers/cards');

const app = express();
const { PORT = 3000, PATH_MONGO = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

mongoose.set('strictQuery', false);

mongoose.connect(PATH_MONGO, {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  req.user = { _id: '6615fdbe9c5ef90274378ba6' };
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', routerUsers);
app.use('/cards', routerCards);

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT} ...`);
});
