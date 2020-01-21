module.exports = (sequelize, DataTypes) => {
  const Newsletter = sequelize.define('Newsletter', {
    subject: DataTypes.STRING,
    message: DataTypes.TEXT
  });
  
  return Newsletter;
};