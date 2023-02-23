const AuthRoutes = require("./AuthRoutes");
const ProductRoutes = require("./ProductRoutes");
const UserRoutes = require("./UserRoutes");
const VoucherRoutes = require("./VoucherRoutes");

const routerHandle = (app) => {
  app.use("/auth", AuthRoutes);
  app.use("/user", UserRoutes);
  app.use("/product", ProductRoutes);
  app.use("/voucher", VoucherRoutes);
};

module.exports = routerHandle;
