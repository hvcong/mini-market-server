const {
  StoreTransaction,
  ProductUnitType,
  Product,
  SubCategory,
  Category,
  UnitType,
  Price,
  BillDetail,
  Bill,
} = require("../config/persist");
const { onlyUpdateProduct } = require("./ProductServices");
const { getProduct, getUnitType } = require("./ProductUnitTypeServices");
const { Op, Sequelize } = require("sequelize");
const { getMaxUnit } = require("./UnitTypeServices");

const services = {
  add: async (data) => {
    try {
      const { quantity, type, ProductUnitTypeId, employeeId } = data;
      const transaction = await StoreTransaction.create({
        quantity,
        type,
        ProductUnitTypeId,
        EmployeeId: employeeId,
      });
      const unitType = await getUnitType(ProductUnitTypeId);
      const product = await getProduct(ProductUnitTypeId);
      const qty = product.quantity;
      let newQty = qty + quantity * unitType.convertionQuantity;
      await onlyUpdateProduct(product.id, { quantity: newQty });
      return { transaction, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  addMany: async (data) => {
    try {
      const transactions = [];
      for (const e of data) {
        const { quantity, createAt, type, ProductUnitTypeId, employeeId } = e;
        const transaction = await StoreTransaction.create({
          quantity,
          createAt,
          type,
          ProductUnitTypeId,
          // EmployeeId: employeeId,
        });
        const unitType = await getUnitType(ProductUnitTypeId);
        const product = await getProduct(ProductUnitTypeId);
        const qty = product.quantity;
        let newQty = qty + quantity * unitType.convertionQuantity;
        await onlyUpdateProduct(product.id, { quantity: newQty });
        transactions.push(transaction);
      }
      return { transactions, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  get: async (query) => {
    try {
      const page = (query._page && Number(query._page)) || 1;
      const limit = (query._limit && Number(query._limit)) || 20;
      var offset = (page - 1) * limit;
      const transactions = await StoreTransaction.findAndCountAll({
        limit: limit,
        offset: offset,
        distinct: true,
        order: [["createAt", "DESC"]],
        include: [{ model: ProductUnitType, include: [{ model: Product }] }],
      });
      return { transactions, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  stastics: async (dateInput) => {
    try {
      const date = new Date(dateInput);
      date.setDate(date.getDate() + 1);
      let transactions = await StoreTransaction.findAll({
        where: { createAt: { [Op.lt]: date } },
        include: {
          model: ProductUnitType,
          required: true,
          include: [
            {
              model: Product,
              attributes: ["name"],
              include: [
                {
                  model: SubCategory,
                  attributes: ["name"],
                  include: [{ model: Category, attributes: ["name"] }],
                },
              ],
            },
            {
              model: UnitType,
              attributes: ["name", "convertionQuantity"],
            },
          ],
        },
        attributes: [
          [
            Sequelize.fn("sum", Sequelize.col("StoreTransaction.quantity")),
            "sum",
          ],
        ],
        group: ["StoreTransaction.ProductUnitTypeId"],
      });
      let pendingBills = await Bill.findAll({
        where: { type: "pending", isDDH: true, orderdate: { [Op.lt]: date } },
        include: {
          model: BillDetail,
          include: [
            {
              model: Price,
              include: [
                {
                  model: ProductUnitType,
                  include: [{ model: UnitType }],
                },
              ],
            },
          ],
        },
      });
      if (pendingBills.length) {
        pendingBills = pendingBills.map((e) => {
          return e.BillDetails.map((x) => {
            return {
              productId: x.Price.ProductUnitType.ProductId,
              holdingQty:
                x.quantity *
                x.Price.ProductUnitType.UnitType.convertionQuantity,
            };
          });
        });
        pendingBills = pendingBills.flat();
        pendingBills = pendingBills.reduce((accumulator, object) => {
          if (
            (objectFound = accumulator.find(
              (item) => item.productId === object.productId
            ))
          ) {
            objectFound.holdingQty += object.holdingQty;
          } else {
            accumulator.push(object);
          }
          return accumulator;
        }, []);
      }

      for (let e of transactions) {
        let maxUnit = await getMaxUnit(e.ProductUnitType.ProductId);
        e.setDataValue("maxUnit", maxUnit);
      }
      transactions = transactions.map((e) => {
        let maxUnit = e.dataValues.maxUnit.maxUnit;
        let numConvert = e.ProductUnitType.UnitType.convertionQuantity;
        let sum = e.dataValues.sum * numConvert;
        e.setDataValue("sum", sum);

        return {
          category: e.ProductUnitType.Product.SubCategory.Category.name,
          subCategory: e.ProductUnitType.Product.SubCategory.name,
          productId: e.ProductUnitType.ProductId,
          productName: e.ProductUnitType.Product.name,
          reportUnit:
            maxUnit > 1 ? "thung " + maxUnit : e.dataValues.maxUnit.name,
          baseUnit: e.dataValues.maxUnit.name,
          sum: e.dataValues.sum,
          holdingQty: 0,
          maxUnit: maxUnit,
        };
      });
      transactions.push(...pendingBills);
      transactions = transactions.reduce((accumulator, object) => {
        if (
          (objectFound = accumulator.find(
            (item) => item.productId === object.productId
          ))
        ) {
          if(object.sum){
            objectFound.sum += object.sum;
          }
          objectFound.holdingQty += object.holdingQty;
        } else {
          accumulator.push(object);
        }
        return accumulator;
      }, []);
      transactions = transactions.map((e) => {
        let maxUnit = e.maxUnit;
        let sum = e.sum;
        let holdingReport = e.holdingQty ? Math.floor(e.holdingQty / maxUnit) : 0
        let holdingBase = e.holdingQty ? e.holdingQty % maxUnit : 0
        let reportQty = Math.floor(sum / maxUnit)+holdingReport;
        let reportBaseQty = sum % maxUnit + holdingBase;
        return {
          category: e.category,
          subCategory: e.subCategory,
          productId: e.productId,
          productName: e.productName,
          reportUnit: e.reportUnit,
          baseUnit: e.baseUnit,
          reportQty: reportQty,
          reportBaseQty: reportBaseQty,
          holdingReport: holdingReport,
          holdingBase: holdingBase,
          sellAble:
            reportQty > holdingReport
              ? reportQty - holdingReport
              : reportQty,
          baseSellAble:
            reportBaseQty >= holdingBase
              ? reportBaseQty - holdingBase
              : reportBaseQty,
        };
      });
      return { transactions, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
};
module.exports = services;
