const {
  InputDetail,
  ProductUnitType,
  Product,
  UnitType,
  Price,
  ListPricesHeader,
} = require("../config/persist");
const { Op, Sequelize } = require("sequelize");

const services = {
  createManyDetails: async (data) => {
    try {
      const inputDetails = await InputDetail.bulkCreate(data);
      return inputDetails;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  stastics: async (from, to, productId) => {
    try {
      let inputs = [];
      if (!to) {
        const tmpInputs = await InputDetail.findAll({
          where: Sequelize.where(
            Sequelize.fn("date", Sequelize.col("createAt")),
            from
          ),
          include: [
            {
              model: ProductUnitType,
              include: [{ model: Product }, { model: UnitType }],
            },
          ],
        });
        if (!tmpInputs.length) {
          return {
            message: "inputs not found on that date",
            isSuccess: false,
            status: 404,
          };
        }
        inputs = [...tmpInputs];
      }
      if (from && to) {
        const fromDate = new Date(from);
        const toDate = new Date(to);
        toDate.setDate(toDate.getDate() + 1);
        const tmpInputs = await InputDetail.findAll({
          where: {
            createAt: { [Op.between]: [fromDate, toDate] },
          },
          include: [
            {
              model: ProductUnitType,
              include: [
                { model: Product },
                { model: UnitType },
                { model: Price, include: [{ model: ListPricesHeader }] },
              ],
            },
          ],
        });
        if (!tmpInputs.length) {
          return {
            message: "not found on that range date",
            isSuccess: false,
            status: 404,
          };
        }
        inputs = [...tmpInputs];
      }
      if (productId) {
        inputs = inputs.filter((e) =>
          e.ProductUnitType.ProductId.startsWith(productId)
        );
      }

      inputs = inputs.map((e) => {
        let listprices = e.ProductUnitType.Prices;
        let price = 0;
        for (let x of listprices) {
          const header = x.ListPricesHeader;
          const endDate = new Date(header.endDate);
          const now = new Date();
          const state = header.state;
          if (state && endDate >= now) {
            price = x.price;
          }
        }
        let sumPrice = 0;
        if (price) {
          sumPrice = price * e.quantity;
        }
        return {
          productId: e.ProductUnitType.ProductId,
          productName: e.ProductUnitType.Product.name,
          quantity: e.quantity,
          unitType: e.ProductUnitType.UnitType.name,
          sum: price ? sumPrice : "product do not have price ",
        };
      });
      return { inputs, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
};

module.exports = services;
