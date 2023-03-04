const sequelize = require("./database");

const Account = require("../models/Account.js");
const HomeAddress = require("../models/HomeAddress.js");
const Bill = require("../models/Bill.js");
const BillDetail = require("../models/BillDetail.js");
const CartDetail = require("../models/CartDetail.js");
const Customer = require("../models/Customer.js");
const PromotionHeader = require("../models/PromotionHeader.js");
const MoneyPromotion = require("../models/MoneyPromotion.js");
const ProductPromotion = require("../models/ProductPromotion.js");
const GiftProduct = require("../models/GiftProduct.js");
const Price = require("../models/Price.js");
const Product = require("../models/Product");
// const ProductLine = require("../models/ProductLine.js");
const ShoppingCart = require("../models/ShoppingCart.js");
const Voucher = require("../models/Voucher.js");
const TypeCustomer = require("../models/TypeCustomer");
const City = require("../models/City");
const Ward = require("../models/Ward");
const Street = require("../models/Street");
const Category = require("../models/Category");
const UnitType = require("../models/UnitType");
const Role = require("../models/Role.js");
const CategoryProduct = require("../models/CategoryProduct");
const Employee = require('../models/Employee')

// account
Account.belongsTo(Customer);
Account.belongsTo(Employee)
Account.hasMany(Role);

//role
Role.belongsTo(Account);

// customer
Customer.belongsTo(HomeAddress);
Customer.hasOne(Account);
Customer.hasOne(ShoppingCart);
Customer.hasMany(Bill);
Customer.belongsTo(TypeCustomer);

// typeuser
TypeCustomer.hasMany(Customer);

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
Price.hasOne(GiftProduct)

// Employee
Employee.hasMany(Bill)
Employee.hasOne(Account)
Employee.belongsTo(HomeAddress)

// Bill
Bill.hasMany(BillDetail);
Bill.belongsTo(Voucher);
Bill.belongsTo(Customer);
Bill.belongsTo(Employee)

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
HomeAddress.hasOne(Customer);
HomeAddress.hasOne(Employee)
HomeAddress.belongsTo(Street);

// shoppingCart
ShoppingCart.belongsTo(Customer);
ShoppingCart.hasMany(CartDetail);

// CartDetail
CartDetail.belongsTo(ShoppingCart);
CartDetail.belongsTo(Price);

// PromotionHeader
PromotionHeader.hasMany(ProductPromotion)
PromotionHeader.hasMany(MoneyPromotion)

// ProductPromotion
ProductPromotion.belongsTo(PromotionHeader)
ProductPromotion.hasMany(GiftProduct)

// MoneyPromotion
MoneyPromotion.belongsTo(PromotionHeader)
MoneyPromotion.hasMany(GiftProduct)

// GiftProduct
GiftProduct.belongsTo(ProductPromotion)
GiftProduct.belongsTo(MoneyPromotion)
GiftProduct.belongsTo(Price)

sequelize
  .sync({ alter: true })
  .then((result) => {
    console.log("has been done");
  })
  .catch((error) => console.log(error));

module.exports = {
  Account,
  Customer,
  Employee,
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
