const sequelize = require("./database");

const Account = require("../models/Account.js");
const HomeAddress = require("../models/HomeAddress.js");
const Bill = require("../models/Bill.js");
const BillDetail = require("../models/BillDetail.js");
// const CartDetail = require("../models/CartDetail.js");
const Customer = require("../models/Customer.js");
const PromotionHeader = require("../models/PromotionHeader.js");
const MoneyPromotion = require("../models/MoneyPromotion.js");
const ProductPromotion = require("../models/ProductPromotion.js");
const GiftProduct = require("../models/GiftProduct.js");
const Price = require("../models/Price.js");
const Product = require("../models/Product");
const Voucher = require("../models/Voucher.js");
const TypeCustomer = require("../models/TypeCustomer");
const City = require("../models/City");
const Ward = require("../models/Ward");
const District = require("../models/District");
const Category = require("../models/Category");
const UnitType = require("../models/UnitType");
const Role = require("../models/Role.js");
const SubCategory = require("../models/SubCategory");
const Employee = require("../models/Employee");
const Image = require("../models/Image");
const DiscountRateProduct = require("../models/DiscountRateProduct");
const ListPricesHeader = require("../models/ListPricesHeader");
const PromotionResult = require("../models/PromotionResult");
const RetrieveBill = require("../models/RetrieveBill");
const StoreTransaction = require("../models/StoreTransaction");
const ProductUnitType = require("../models/ProductUnitype");
const WareHouseTicket = require("../models/WareHouseTicket");
const PromotionTypeCustomer = require("../models/PromoHeaderTypeCustomer");
const TicketDetail = require("../models/TicketDetails");
const Input = require("../models/Input");
const InputDetail = require("../models/InputDetail");

// account
Account.belongsTo(Customer);
Account.belongsTo(Employee);
Account.hasMany(Role);

//role
Role.belongsTo(Account);

// customer
Customer.belongsTo(HomeAddress);
Customer.hasOne(Account);
Customer.hasMany(Bill);
Customer.belongsTo(TypeCustomer);

// typeuser
TypeCustomer.hasMany(Customer);
TypeCustomer.belongsToMany(PromotionHeader, { through: PromotionTypeCustomer });
TypeCustomer.hasMany(PromotionTypeCustomer);

//category
Category.hasMany(SubCategory);

// SubCategory
SubCategory.belongsTo(Category);
SubCategory.hasMany(Product);

//product
Product.belongsTo(SubCategory);
Product.hasMany(Image, { as: "images" });
Image.belongsTo(Product);
Product.belongsToMany(UnitType, { through: ProductUnitType });
UnitType.belongsToMany(Product, { through: ProductUnitType });
Product.hasMany(ProductUnitType);

//Price
Price.belongsTo(ListPricesHeader);
Price.hasOne(BillDetail);
Price.belongsTo(ProductUnitType);

// UnitType
UnitType.hasMany(ProductUnitType);

//ProductUnitype
ProductUnitType.belongsTo(Product);
ProductUnitType.belongsTo(UnitType);
ProductUnitType.hasMany(Price);
ProductUnitType.hasOne(GiftProduct);
ProductUnitType.hasMany(ProductPromotion);
ProductUnitType.hasOne(DiscountRateProduct);
ProductUnitType.hasMany(InputDetail);
ProductUnitType.hasMany(TicketDetail);
ProductUnitType.hasMany(StoreTransaction);

//storeTransaction
StoreTransaction.belongsTo(ProductUnitType);
StoreTransaction.belongsTo(ProductUnitType);

//ListPricesHeader
ListPricesHeader.hasMany(Price);

// Employee
Employee.hasMany(Bill);
Employee.hasOne(Account);
Employee.belongsTo(HomeAddress);
Employee.hasMany(StoreTransaction);
Employee.hasMany(WareHouseTicket);
Employee.hasMany(Input);

//Input
Input.belongsTo(Employee);
Input.hasMany(InputDetail);

//InputDetail
InputDetail.belongsTo(Input);
InputDetail.belongsTo(ProductUnitType);

//WareHouseTiket
WareHouseTicket.belongsTo(Employee);
WareHouseTicket.hasMany(TicketDetail);

//WareHouseProduct
TicketDetail.belongsTo(WareHouseTicket);
TicketDetail.belongsTo(ProductUnitType);

// Bill
Bill.hasMany(BillDetail);
Bill.belongsTo(Customer);
Bill.belongsTo(Employee);
Bill.hasMany(PromotionResult);
Bill.hasOne(RetrieveBill);

//promotionResult
PromotionResult.belongsTo(Bill);
PromotionResult.belongsTo(ProductPromotion);
PromotionResult.belongsTo(MoneyPromotion);
PromotionResult.belongsTo(DiscountRateProduct);
PromotionResult.belongsTo(Voucher);

//retrievebill
RetrieveBill.belongsTo(Bill);

// BillDetail
BillDetail.belongsTo(Bill);
BillDetail.belongsTo(Price);

// voucher
Voucher.belongsTo(PromotionHeader);
Voucher.hasOne(PromotionResult);

// City
City.hasMany(District);

//District
District.belongsTo(City);
District.hasMany(Ward);

// Ward
Ward.belongsTo(District);
Ward.hasMany(HomeAddress);

// HomeAdress
HomeAddress.hasOne(Customer);
HomeAddress.hasOne(Employee);
HomeAddress.belongsTo(Ward);

// PromotionHeader
PromotionHeader.hasMany(ProductPromotion);
PromotionHeader.hasMany(MoneyPromotion);
PromotionHeader.hasMany(Voucher);
PromotionHeader.hasMany(DiscountRateProduct);
PromotionHeader.belongsToMany(TypeCustomer, { through: PromotionTypeCustomer });
PromotionHeader.hasMany(PromotionTypeCustomer);

//PromotionTypeCustomer
PromotionTypeCustomer.belongsTo(PromotionHeader);
PromotionTypeCustomer.belongsTo(TypeCustomer);

// ProductPromotion
ProductPromotion.belongsTo(PromotionHeader);
ProductPromotion.hasOne(GiftProduct);
ProductPromotion.belongsTo(ProductUnitType);
ProductPromotion.hasMany(PromotionResult);

// MoneyPromotion
MoneyPromotion.belongsTo(PromotionHeader);
MoneyPromotion.hasMany(PromotionResult);

//DiscountRateProduct
DiscountRateProduct.belongsTo(PromotionHeader);
DiscountRateProduct.belongsTo(ProductUnitType);
DiscountRateProduct.hasMany(PromotionResult);

// GiftProduct
GiftProduct.belongsTo(ProductPromotion);
GiftProduct.belongsTo(ProductUnitType);

sequelize
  .sync({})
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
  Category,
  MoneyPromotion,
  ProductPromotion,
  PromotionHeader,
  GiftProduct,
  Price,
  Product,
  Voucher,
  City,
  Ward,
  District,
  UnitType,
  Image,
  SubCategory,
  DiscountRateProduct,
  ListPricesHeader,
  StoreTransaction,
  RetrieveBill,
  PromotionResult,
  ProductUnitType,
  TypeCustomer,
  WareHouseTicket,
  TicketDetail,
  Input,
  InputDetail,
};
