const AuthRoutes = require("./AuthRoutes");
const ProductRoutes = require("./ProductRoutes");
const UserRoutes = require("./UserRoutes");
const VoucherRoutes = require("./VoucherRoutes");
const UnitTypeRoutes = require('../routes/UnitTypeRoutes')
const PriceRoutes = require('./PriceRoutes')
const PromotionRoutes = require('./PromotonHeaderRoutes')
const ProductPromotionRoutes = require('./ProductPromotionRoutes')
const MoneyPromotionRoutes = require('./MoneyPromotionRoutes')
const GiftProductRoutes = require('./GiftProductRoutes')


const routerHandle = (app) => {
  app.use("/auth", AuthRoutes);
  app.use("/user", UserRoutes);
  app.use("/product", ProductRoutes);
  app.use("/voucher", VoucherRoutes);
  app.use('/unitType',UnitTypeRoutes);
  app.use('/price',PriceRoutes)
  app.use('/promotion',PromotionRoutes)
  app.use('/productPromotion',ProductPromotionRoutes)
  app.use('/moneyPromotion',MoneyPromotionRoutes)
  app.use('/giftProduct',GiftProductRoutes)
};

module.exports = routerHandle;
