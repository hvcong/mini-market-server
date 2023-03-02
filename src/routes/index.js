const AuthRoutes = require("./AuthRoutes");
const ProductRoutes = require("./ProductRoutes");
const UserRoutes = require("./UserRoutes");
const VoucherRoutes = require("./VoucherRoutes");
const UnitTypeRoutes = require('../routes/UnitTypeRoutes')
const PriceRoutes = require('./PriceRoutes')
const PromotionRoutes = require('./PromotonHeaderRoutes')

const routerHandle = (app) => {
  app.use("/auth", AuthRoutes);
  app.use("/user", UserRoutes);
  app.use("/product", ProductRoutes);
  app.use("/voucher", VoucherRoutes);
  app.use('/unitType',UnitTypeRoutes);
  app.use('/price',PriceRoutes)
  app.use('/promotion',PromotionRoutes)
};

module.exports = routerHandle;
