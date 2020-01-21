module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: DataTypes.STRING,
    price: DataTypes.STRING,
    description: DataTypes.STRING,
  });

  return Book;
};