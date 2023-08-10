const TABLE_NAME = "all-for-you";
const config = {
  PORT: process.env.PORT || 5000,
  //DB_CONNECTION: `mongodb://localhost/${TABLE_NAME}`,
  DB_CONNECTION: `mongodb+srv://kukt94:Joriknoc1994@purtshub.omlzz8q.mongodb.net/`,
  SECRET: "badumts",
  SALT: 10,
  COOKIE_NAME: "USER_SESSION",
  CLOUDINARY_NAME: "ddxtnl2q7",
  CLOUDINARY_API_KEY: 157446743997535,
  CLOUDINARY_API_SECRET: "-VCkjTKwAo19EYqT38xJMhotPS4",
  // CLOUDINARY_STORAGE: 'pza5zln6'
};

module.exports = config;
