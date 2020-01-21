import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
// import database from '../src/models'
import configJson from '../src/config/config'

const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';

const config = configJson[env];

function regexChecker(regex, value) {
  return regex.test(value.toString());
}

export default class Util {
  constructor() {
    this.statusCode = null
    this.type = null
    this.data = null
    this.message = null
  }

  setSuccess(statusCode, message, data) {
    this.statusCode = statusCode
    this.message = message
    this.data = data
    this.type = 'true'
  }

  setError(statusCode, message) {
    this.statusCode = statusCode
    this.message = message
    this.type = 'error'
  }

  send(res) {
    const result = {
      status: this.statusCode,
      data: this.data,
      success: this.type,
      message: this.message,
    }

    if (this.type === 'true') {
      return res.status(this.statusCode).json(result)
    }


    return res.status(this.statusCode).json({
      status: this.type,
      message: this.message
    })
  }

  hashPassword(password) {
    try {
      return bcrypt.hashSync(password, config.saltRounds)
    } catch (err) { throw err }
  }

  comparePassword(password, passwordHash) {
    try {
      const result = bcrypt.compareSync(password || '', passwordHash)
      return result
    } catch (err) { throw err }
  }

  generateToken(params) {
    try {
      const token = jwt.sign(params, config.jwtSecret, { expiresIn: config.tokenExpireTime })
      return token
    } catch (err) { throw err }
  }

  verifyToken(token) {
    try {
      const verify = jwt.verify(token, process.env.SECRET_KEY);
      return verify;
    } catch (err) { throw err }
  }

  imageConverter(file) {
    if (file && file == {}) {
      const fileRegex = /(data:image\/(png|jpg|jpeg);base64)/;
      const valid = regexChecker(fileRegex, file.data);
      console.log('valid is', valid);
      const fileType = file.name.split('.')[1];
      const fileName = file.name.split('.')[0].replace(/ /, '_') + Date.now();
      if (valid) {
        try {
          const base64File = file.data.split('base64,')[1];
          fs.writeFile(path.resolve('public', `${fileName}.${fileType}`), base64File, 'base64', (err) => {
            if (err) {
              throw err;
            }
          });
          // eslint-disable-next-line no-param-reassign
          file.data = `/public/${fileName}.${fileType}`;
          return file;
        } catch (error) {
          throw error;
        }
      } else return file;
    } else return file
  }

  fileRemoval(file) {
  const fileRegex = /public/;
  const valid = regexChecker(fileRegex, file);
  if (valid) {
    // eslint-disable-next-line no-param-reassign
    file = file.replace(/\/public/, 'public');
    const filePath = path.resolve(file);
    try {
      fs.unlink(filePath, (err) => {
        if (err) {
          throw err;
        }
      });
    } catch (error) {
      throw error;
    }
  }
}
}