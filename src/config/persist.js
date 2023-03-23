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
const WareHouseTiket = require("../models/WareHouseTiket");
const pUnitpPromotion = require("../models/pUnitpPromotion");
const pUnitDRProduct = require("../models/pUnitDRProduct");

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

//category
Category.hasMany(SubCategory);

// SubCategory
SubCategory.belongsTo(Category);
SubCategory.hasMany(Product);

//product
Product.belongsTo(SubCategory);
Product.hasMany(StoreTransaction);
Product.hasMany(Image, { as: "images" });
Image.belongsTo(Product);
Product.belongsToMany(UnitType, { through: ProductUnitType });
UnitType.belongsToMany(Product, { through: ProductUnitType });
Product.hasMany(WareHouseTiket);

Product.hasMany(ProductUnitType);

//Price
Price.belongsTo(ListPricesHeader);
Price.hasOne(CartDetail);
Price.hasOne(BillDetail);
Price.belongsTo(ProductUnitType);

// UnitType
UnitType.hasMany(ProductUnitType);

//ProductUnitype
ProductUnitType.belongsToMany(ProductPromotion, { through: pUnitpPromotion });
ProductUnitType.belongsToMany(DiscountRateProduct, { through: pUnitDRProduct });
ProductUnitType.hasMany(pUnitpPromotion);
ProductUnitType.hasMany(pUnitDRProduct);
ProductUnitType.belongsTo(Product);
ProductUnitType.belongsTo(UnitType);
ProductUnitType.hasMany(Price);
ProductUnitType.hasOne(GiftProduct);

//storeTransaction
StoreTransaction.belongsTo(Product);
StoreTransaction.belongsTo(Employee);

//ListPricesHeader
ListPricesHeader.hasMany(Price);

// Employee
Employee.hasMany(Bill);
Employee.hasOne(Account);
Employee.belongsTo(HomeAddress);
Employee.hasMany(StoreTransaction);
Employee.hasMany(WareHouseTiket);

//WareHouseTiket
WareHouseTiket.belongsTo(Employee);
WareHouseTiket.belongsTo(Product);

// Bill
Bill.hasMany(BillDetail);
Bill.belongsTo(Voucher);
Bill.belongsTo(Customer);
Bill.belongsTo(Employee);
Bill.hasOne(PromotionResult);
Bill.hasOne(RetrieveBill);

//promotionResult
PromotionResult.belongsTo(Bill);

//retrievebill
RetrieveBill.belongsTo(Bill);

// BillDetail
BillDetail.belongsTo(Bill);
BillDetail.belongsTo(Price);

// voucher
Voucher.hasOne(Bill);
Voucher.belongsTo(PromotionHeader);

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

// CartDetail
CartDetail.belongsTo(Price);

// PromotionHeader
PromotionHeader.hasMany(ProductPromotion);
PromotionHeader.hasMany(MoneyPromotion);
PromotionHeader.hasMany(Voucher);
PromotionHeader.hasMany(DiscountRateProduct);

// ProductPromotion
ProductPromotion.belongsTo(PromotionHeader);
ProductPromotion.hasOne(GiftProduct);
ProductPromotion.belongsToMany(ProductUnitType, { through: pUnitpPromotion });
ProductPromotion.hasMany(pUnitpPromotion);

//pUnitpPromotion
pUnitpPromotion.belongsTo(ProductUnitType);
pUnitpPromotion.belongsTo(ProductPromotion);

// MoneyPromotion
MoneyPromotion.belongsTo(PromotionHeader);

//DiscountRateProduct
DiscountRateProduct.belongsTo(PromotionHeader);
DiscountRateProduct.belongsToMany(ProductUnitType, { through: pUnitDRProduct });
DiscountRateProduct.hasMany(pUnitDRProduct);

//pUnitDRProduct
pUnitDRProduct.belongsTo(ProductUnitType);
pUnitDRProduct.belongsTo(DiscountRateProduct);

// GiftProduct
GiftProduct.belongsTo(ProductPromotion);
GiftProduct.belongsTo(ProductUnitType);

sequelize
  .sync({ force: false })
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
  WareHouseTiket,
};
