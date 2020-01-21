module.exports = (sequelize, DataTypes) => {
  const Page = sequelize.define('Page', {
    name: DataTypes.STRING,
    route: DataTypes.STRING,
    attributes: DataTypes.JSONB
  });
  
  return Page;
};