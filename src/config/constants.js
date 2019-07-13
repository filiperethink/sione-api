require('dotenv').config();

export default {
  MONGO_URL: process.env.MONGO_URL_DEV,
  JWT_SECRET: process.env.JWT_SECRET_DEV,
  MONGOOSE_DEBUG: process.env.MONGOOSE_DEBUG,
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
};

export const WHITELIST = {
  users: {
    create: ['email', 'firstName', 'lastName', 'password', 'role', 'pro', 'admin_pelada'],
    update: ['email', 'firstName', 'lastName', 'password', 'role', 'pro', 'admin_pelada'],
  },
  peladas: {
    create: ['name', 'players', 'seasonSize', 'matchDuration', 'scoreLimit', 'teamSize'],
    update: ['name', 'players', 'seasonSize', 'matchDuration', 'scoreLimit', 'teamSize'],
  },
  auth: {
    login: ['email', 'password'],
  },
};
