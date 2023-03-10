const AuthRoutes = require("./AuthRoutes");
const ProductRoutes = require("./ProductRoutes");
const CustomerRoutes = require("./CustomerRoutes");
const VoucherRoutes = require("./VoucherRoutes");
const UnitTypeRoutes = require('../routes/UnitTypeRoutes')
const PriceRoutes = require('./PriceRoutes')
const PromotionRoutes = require('./PromotonHeaderRoutes')
const ProductPromotionRoutes = require('./ProductPromotionRoutes')
const MoneyPromotionRoutes = require('./MoneyPromotionRoutes')
const GiftProductRoutes = require('./GiftProductRoutes')
const SubCategoryRoutes = require('./SubCategoryRoutes')
const CategoryRoutes = require('./CategoryRoutes')
const DiscountRateProductRoutes = require('./DiscountRateProductRoutes')
const BillRoutes = require('./BillRoutes')
const EmployeeRoutes = require('./EmployeeRoutes')
const CityRoutes = require('./CityRoutes')
const DistrictRoutes  = require('./DistrictRoutes')
const WardRoutes = require('./WardRoutes')
const ListPricesHeaderRoutes = require('./ListPricesHeaderRoutes')
const StoreRoutes = require('./StoreRoutes')
const RetrieveRoutes = require('./RetrieveRoutes')

const routerHandle = (app) => {
  app.use("/auth", AuthRoutes);
  app.use("/user", CustomerRoutes);
  app.use("/product", ProductRoutes);
  app.use("/voucher", VoucherRoutes);
  app.use('/unitType',UnitTypeRoutes);
  app.use('/price',PriceRoutes)
  app.use('/promotion',PromotionRoutes)
  app.use('/productPromotion',ProductPromotionRoutes)
  app.use('/moneyPromotion',MoneyPromotionRoutes)
  app.use('/giftProduct',GiftProductRoutes)
  app.use('/subCategory',SubCategoryRoutes)
  app.use('/category',CategoryRoutes)
  app.use('/discount',DiscountRateProductRoutes)
  app.use('/bill',BillRoutes)
  app.use('/employee',EmployeeRoutes)
  app.use('/city',CityRoutes)
  app.use('/district',DistrictRoutes)
  app.use('/ward',WardRoutes)
  app.use('/priceHeader',ListPricesHeaderRoutes)
  app.use('/store',StoreRoutes)
  app.use('/retrieve',RetrieveRoutes)
};

module.exports = routerHandle;
