import express from 'express';

import auth from './auth';
import users from './users';
import response from '../helpers/response';
import notes from './notes'

const routes  = express.Router();

routes.use(response.setHeadersForCORS);

routes.use('/', auth);
routes.use('/users', users);

routes.use('/notes', notes)

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Ok' });
});

routes.use(function(req, res) {
  response.sendNotFound(res);
});



module.exports = routes;
