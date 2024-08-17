import "dotenv/config"; //esto toma directamente nuestras variables de entorno de configutracion

export default {
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
  JWT_SECRET: process.env.JWT_SECRET,
};
