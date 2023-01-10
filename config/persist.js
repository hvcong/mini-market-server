const Account = require("../model/Account.js");
const Address = require("../model/Address.js");
const Bill = require("../model/Bill.js");
const BillDetail = require("../model/BillDetail.js");
const CartDetail = require("../model/CartDetail.js");
const Customer = require("../model/Customer.js");
const DiscountMoney = require("../model/DiscountMoney.js");
const DiscountPercent = require("../model/DiscountPercent.js");
const Employee = require("../model/Employee.js");
const GiftByCost = require("../model/GiftByCost.js");
const GiftByProduct = require("../model/GiftByProduct.js");
const GiftProduct = require("../model/GiftProduct.js");
const Price = require("../model/Price.js");
const Product = require("../model/Product.js");
const Salary = require("../model/Salary.js");
const ShoppingCart = require("../model/ShoppingCart.js");
const Voucher = require("../model/Voucher.js");

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
