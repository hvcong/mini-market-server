const Account = require("../models/Account.js");
const Address = require("../models/Address.js");
const Bill = require("../models/Bill.js");
const BillDetail = require("../models/BillDetail.js");
const CartDetail = require("../models/CartDetail.js");
const Customer = require("../models/Customer.js");
const DiscountMoney = require("../models/DiscountMoney.js");
const DiscountPercent = require("../models/DiscountPercent.js");
const Employee = require("../models/Employee.js");
const GiftByCost = require("../models/GiftByCost.js");
const GiftByProduct = require("../models/GiftByProduct.js");
const GiftProduct = require("../models/GiftProduct.js");
const Price = require("../models/Price.js");
const Product = require("../models/Product.js");
const Salary = require("../models/Salary.js");
const ShoppingCart = require("../models/ShoppingCart.js");
const Voucher = require("../models/Voucher.js");

// customer
Customer.hasOne(Address);
Customer.hasOne(Account);
Customer.hasOne(ShoppingCart);
Customer.hasMany(Bill);
// employee
Employee.hasOne(Address);
Employee.hasOne(Account);
Employee.hasMany(Bill);
Employee.hasOne(Salary);
// product
Product.hasOne(Price);
Product.hasOne(BillDetail);
Product.hasMany(GiftProduct);
Product.hasMany(GiftByProduct);
Product.hasMany(CartDetail);
// bill
Bill.hasMany(BillDetail);
Bill.hasOne(Voucher);
Bill.belongsTo(Customer);
Bill.hasOne(Address);
Bill.hasOne(GiftByCost);
Bill.hasOne(Employee);
// billdetail
BillDetail.belongsTo(Bill);
BillDetail.hasOne(Product);
// voucher
Voucher.hasOne(DiscountPercent);
Voucher.hasOne(DiscountMoney);

module.exports = {
  Account,
  Address,
  Bill,
  BillDetail,
  CartDetail,
  Customer,
  DiscountMoney,
  DiscountPercent,
  Employee,
  GiftByCost,
  GiftByProduct,
  GiftProduct,
  Price,
  Product,
  Salary,
  ShoppingCart,
  Voucher,
};
