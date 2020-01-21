module.exports = (sequelize, DataTypes) => {
  const Subscripton = sequelize.define('Subscripton', {
    name: DataTypes.STRING,
    email: DataTypes.STRING
  });
  
  return Subscripton;
};