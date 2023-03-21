import express from 'express';

const appRouter = express.Router();

appRouter.use('/auth', require('./auth'));

appRouter.use('/holiday', require('./holiday'));

appRouter.use('/schedule', require('./schedule'));

export default module.exports = appRouter;
