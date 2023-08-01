const bcrypt = require('bcrypt');
const AUTH_FAILED = require('../constants/Constants');

async function encryptPassword (password, res) {
  let hash = '';
  try {
    hash = await bcrypt.hash(password, 10)    
  } catch (error) {
    return res.status(400).json({
      error: error
    })
  }
  return hash
}

async function comparePassword (password, hash , res) {
  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password,hash);    
  } catch (error) {
    return res.status(401).json({
      message: AUTH_FAILED
    })
  }
  return isValidPassword
}

module.exports = {
  comparePassword: comparePassword,
  encryptPassword: encryptPassword
}