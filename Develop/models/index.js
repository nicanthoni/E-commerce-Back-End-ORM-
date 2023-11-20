// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
// 'Product has a foreign key called category_id, being referenced from the Category table'
Product.belongsTo(Category, {
  foreignKey: 'category_id',
});
// Categories have many Products
Category.hasMany(Product, {
  as: 'products',
  foreignKey: 'category_id',
});

// Products belongToMany Tags (through ProductTag)
// any foreign key declaration needed here? Name for 'as' portion okay?
Product.belongsToMany(Tag, {
  through: {
    model: ProductTag,
    unique: false
  },
  as: 'product_tags'
});

// Tags belongToMany Products (through ProductTag)
// any foreign key declaration needed here? Name for 'as' portion okay?
Tag.belongsToMany(Product, {
  through: {
    model: ProductTag,
    unique: false
  },
  as: 'tag_products'
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
