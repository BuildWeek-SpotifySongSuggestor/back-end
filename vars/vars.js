module.exports = {
  PORT: process.env.PORT || 5000,
  
  CLIENT_ID: process.env.CLIENT_ID || '718b14e72ce145d2b969634a8128e73a',
  CLIENT_SECRET: process.env.CLIENT_SECRET || 'ad2d309521d747489720eba292603981',

  BCRYPT_ROUNDS: process.env.BCRYPT_ROUNDS || 4,
  JWT_SECRET: process.env.JWT_SECRET || ':)',

  NODE_ENV: process.env.NODE_ENV || 'development',
}