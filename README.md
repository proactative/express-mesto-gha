
# Project **Mesto** backend

[![Tests](../../actions/workflows/tests-14-sprint.yml/badge.svg)](../../actions/workflows/tests-14-sprint.yml)

## Technologies and libraries:

- Express
- MongoDB
- Mongoose
- Celebrate/Joi
- Winston

***for dev***
- Eslint
- Nodemon

## Main directories:

`/routes`  
`/controllers` <br/> 
`/models`  <br/>
`/middlewares` <br/>
`/errors`


## Routers:
|API request| Router | Aim |
| ------------- | ------------- |------------- |
| POST | `/signin` | authorization|
| POST |`/signup` | registration|
| GET |`/users/me`|  get information about the user|
| GET |`/cards` |get all cards|
| POST |`/cards`  |add a card|
| PUT |`/cards/:cardId/likes`| put 'like'|
| DELETE| `/cards/:cardId/likes`| remove 'like'|
| DELETE |`/cards/:cardId` |delete the card|
| PATCH |`/users/me`| update the user`s profile|
| PATCH |`/users/me/avatar`| update the user`s avatar|
  

## Start the project:

`npm run start` — start the server  <br/>
`npm run dev` — start the server with hot-reload

## [Link to the project](https://github.com/proactative/express-mesto-gha)
