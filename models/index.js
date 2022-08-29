// import models
const Category = require('./Category');
const Product = require('./Product');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');


Category.hasMany(Product, { foreignKey: 'category_id', onDelete: 'SET NULL' });

Product.belongsTo(Category, { foreignKey: 'category_id' });

Product.belongsToMany(Tag, { through: ProductTag, foreignKey: 'product_id' });

Tag.belongsToMany(Product, { through: ProductTag, foreignKey: 'tag_id' });

module.exports = {
  Category,
  Product,
  ProductTag,
  Tag,
};
