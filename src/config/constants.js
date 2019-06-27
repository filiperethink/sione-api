require('dotenv').config();

export default {
  MONGO_URL: process.env.MONGO_URL_DEV,
  JWT_SECRET: process.env.JWT_SECRET_DEV,
  MONGOOSE_DEBUG: process.env.MONGOOSE_DEBUG,
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
};
