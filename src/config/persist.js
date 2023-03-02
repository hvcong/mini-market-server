const sequelize = require("./database");

const Account = require("../models/Account.js");
const HomeAddress = require("../models/HomeAddress.js");
const Bill = require("../models/Bill.js");
const BillDetail = require("../models/BillDetail.js");
const CartDetail = require("../models/CartDetail.js");
const User = require("../models/User.js");
const PromotionHeader = require("../models/PromotionHeader.js");
const MoneyPromotion = require("../models/MoneyPromotion.js");
const ProductPromotion = require("../models/ProductPromotion.js");
const GiftProduct = require("../models/GiftProduct.js");
const Price = require("../models/Price.js");
const Product = require("../models/Product");
// const ProductLine = require("../models/ProductLine.js");
const ShoppingCart = require("../models/ShoppingCart.js");
const Voucher = require("../models/Voucher.js");
const TypeUser = require("../models/TypeUser");
const City = require("../models/City");
const Ward = require("../models/Ward");
const Street = require("../models/Street");
const Category = require("../models/Category");
const UnitType = require("../models/UnitType");
const Role = require("../models/Role.js");
const CategoryProduct = require("../models/CategoryProduct");

// account
Account.belongsTo(User);
Account.hasMany(Role);

//role
Role.belongsTo(Account);

// customer
User.belongsTo(HomeAddress);
User.hasOne(Account);
User.hasOne(ShoppingCart);
User.hasMany(Bill);
User.belongsTo(TypeUser);

// typeuser
TypeUser.hasMany(User);

//category
Category.belongsToMany(Product, { through: CategoryProduct });

//product
Product.belongsToMany(Category, { through: CategoryProduct });
Product.belongsToMany(UnitType, { through: Price });
UnitType.belongsToMany(Product, { through: Price });
Product.hasMany(Price);

// UnitType
UnitType.hasMany(Price);

//Price
Price.belongsTo(UnitType);
Price.belongsTo(Product);
Price.hasOne(CartDetail);
Price.hasOne(BillDetail);

// // bill
Bill.hasMany(BillDetail);
Bill.belongsTo(Voucher);
Bill.belongsTo(User);

// BillDetail
BillDetail.belongsTo(Bill);
BillDetail.belongsTo(Price);

// voucher
Voucher.hasOne(Bill);

// City
City.hasMany(Ward);

// Ward
Ward.belongsTo(City);
Ward.hasMany(Street);

//Street
Street.belongsTo(Ward);
Street.hasMany(HomeAddress);

// HomeAdress
HomeAddress.hasOne(User);
HomeAddress.belongsTo(Street);

// shoppingCart
ShoppingCart.belongsTo(User);
ShoppingCart.hasMany(CartDetail);

// CartDetail
CartDetail.belongsTo(ShoppingCart);
CartDetail.belongsTo(Price);

// PromotionHeader
PromotionHeader.hasMany(ProductPromotion)
PromotionHeader.hasMany(MoneyPromotion)

// ProductPromotion
ProductPromotion.belongsTo(PromotionHeader)

// MoneyPromotion
MoneyPromotion.belongsTo(PromotionHeader)

sequelize
  .sync({ alter: true })
  .then((result) => {
    console.log("has been done");
  })
  .catch((error) => console.log(error));

module.exports = {
  Account,
  User,
  Role,
  HomeAddress,
  Bill,
  BillDetail,
  CartDetail,
  Category,
  MoneyPromotion,
  ProductPromotion,
  PromotionHeader,
  GiftProduct,
  Price,
  Product,
  ShoppingCart,
  Voucher,
  City,
  Ward,
  Street,
  UnitType,
};
