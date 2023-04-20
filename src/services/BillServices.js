const {
  Bill,
  Employee,
  Customer,
  BillDetail,
  PromotionResult,
  MoneyPromotion,
  DiscountRateProduct,
  ProductPromotion,
  RetrieveBill,
  Voucher,
  Price,
  ProductUnitType,
  UnitType,
  GiftProduct,
  Product,
  HomeAddress,
  Ward,
  District,
  City,
  TypeCustomer,
  SubCategory,
} = require("../config/persist");
const { Op, Sequelize } = require("sequelize");
const { getCustomerByPhonenumber, add } = require("./CustomerServices");
const { createBillDetais } = require("./BillDetailServices");
const { getGiftByKmId } = require("./ProductPromotionServices");
const StoreServices = require("./StoreServices");
const { getByPriceId } = require("./PriceServices");

const services = {
  add: async (data) => {
    try {
      const { cost, customerPhonenumber, type, EmployeeId, priceIds } = data;
      if (!customerPhonenumber && !EmployeeId) {
        return {
          message: "missing customerPhonenumber or employeeId",
          isSuccess: false,
          status: 400,
        };
      }
      let { customer } = await getCustomerByPhonenumber(customerPhonenumber);
      var billdetails = await createBillDetais(priceIds);
      const bill = await Bill.create({ cost, EmployeeId, type });
      if (customer) {
        await bill.setCustomer(customer);
      } else {
        let { customer } = await add({
          id: "KH" + customerPhonenumber,
          phonenumber: customerPhonenumber,
        });
        await bill.setCustomer(customer);
      }
      await bill.setBillDetails(billdetails);
      return { bill, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  get: async (query) => {
    const page = (query._page && Number(query._page)) || 1;
    const limit = (query._limit && Number(query._limit)) || 20;
    const offset = (page - 1) * limit;
    console.log(page);
    try {
      const bills = await Bill.findAndCountAll({
        limit: limit,
        offset: offset,
        include: [
          {
            model: Customer,
          },
          {
            model: Employee,
          },
          {
            model: RetrieveBill,
          },
        ],
        distinct: true,
        order: [["orderDate", "DESC"]],
      });
      return { bills, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  getById: async (query) => {
    const id = query.id;
    try {
      const bill = await Bill.findOne({
        where: {
          id: id,
        },
        include: [
          {
            model: BillDetail,
            include: [
              {
                model: Price,
                include: [
                  {
                    model: ProductUnitType,
                    include: [
                      {
                        model: UnitType,
                      },
                      {
                        model: Product,
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            model: RetrieveBill,
          },

          {
            model: PromotionResult,
            include: [
              { model: MoneyPromotion },
              { model: DiscountRateProduct },
              {
                model: ProductPromotion,
                include: [
                  {
                    model: GiftProduct,
                    include: [
                      {
                        model: ProductUnitType,
                        include: [
                          { model: Product },
                          { model: UnitType },
                          { model: Price },
                        ],
                      },
                    ],
                  },
                ],
              },
              { model: Voucher },
            ],
          },
          {
            model: Employee,
          },
          {
            model: Customer,
          },
        ],
      });
      if (bill) {
        return { bill, isSuccess: true, status: 200 };
      }
      return { message: "bill not found", isSuccess: false, status: 404 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  getClause: async (query) => {
    const page = (query._page && Number(query._page)) || 1;
    const limit = (query._limit && Number(query._limit)) || 20;
    const offset = (page - 1) * limit;
    try {
      const bills = await Bill.findAndCountAll({
        limit: limit,
        offset: offset,
        where: {},
        include: [
          {
            model: Customer,
          },
          {
            model: Employee,
          },
        ],
        distinct: true,
        order: [["orderDate", "DESC"]],
      });
      return { bills, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  getSucceedBill: async (query) => {
    const page = (query._page && Number(query._page)) || 1;
    const limit = (query._limit && Number(query._limit)) || 20;
    const offset = (page - 1) * limit;
    try {
      const bills = await Bill.findAndCountAll({
        limit: limit,
        offset: offset,
        where: { type: "success" },
        include: [
          {
            model: Customer,
          },
          {
            model: Employee,
          },
          {
            model: RetrieveBill,
          },
        ],
        distinct: true,
        order: [["orderDate", "DESC"]],
      });
      return { bills, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  getPendingCancelBill: async (query) => {
    try {
      const page = (query._page && Number(query._page)) || 1;
      const limit = (query._limit && Number(query._limit)) || 20;
      const offset = (page - 1) * limit;
      const bills = await Bill.findAndCountAll({
        limit: limit,
        offset: offset,
        where: { type: ["pending", "cancel"] },
        order: [["orderDate", "DESC"]],
      });
      if (bills.rows.length) {
        return { bills, isSuccess: true, status: 200 };
      }
      return { message: "bill not found", isSuccess: false, status: 404 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  updateType: async (billId, type, employeeId) => {
    try {
      const bill = await Bill.findOne({
        where: {
          id: billId,
        },
      });
      if (!bill) {
        return {
          isSuccess: false,
          status: 400,
        };
      }
      //update
      bill.update({
        type: type,
      });
      if (type == "cancel") {
        const billDetails = await bill.getBillDetails();
        const result = await bill.getPromotionResults();
        for (const e of result) {
          if (e.ProductPromotionId !== null) {
            const { gift } = await getGiftByKmId(e.ProductPromotionId);
            await StoreServices.add({
              quantity: e.quantityApplied,
              ProductUnitTypeId: gift.ProductUnitTypeId,
              type: "trả hàng khuyến mãi đơn hủy",
              employeeId,
            });
          }
        }
        for (const e of billDetails) {
          const { price } = await getByPriceId(e.PriceId);
          await StoreServices.add({
            quantity: e.quantity,
            ProductUnitTypeId: price.ProductUnitTypeId,
            type: "trả hàng đơn hủy",
            employeeId,
          });
        }
      }
      return {
        isSuccess: true,
        status: 200,
      };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  getSoldByDate: async (from, to, employeeId) => {
    try {
      let bills = [];
      if (!to) {
        const tmpBills = await Bill.findAll({
          where: {
            [Op.and]: Sequelize.where(
              Sequelize.fn("date", Sequelize.col("orderDate")),
              from
            ),
            type: "success",
          },
          include: [
            {
              model: Employee,
            },
            {
              model: PromotionResult,
            },
          ],
        });
        if (!tmpBills) {
          return {
            message: "bills not found in that date",
            isSuccess: false,
            status: 404,
          };
        }
        bills = [...tmpBills];
      }
      if (from && to) {
        const fromDate = new Date(from);
        const toDate = new Date(to);
        toDate.setDate(toDate.getDate() + 1);
        const tmpBills = await Bill.findAll({
          where: {
            orderDate: { [Op.between]: [fromDate, toDate] },
            type: "success",
          },
          include: [
            {
              model: Employee,
            },
            {
              model: PromotionResult,
            },
          ],
        });
        if (!tmpBills) {
          return {
            message: "something went wrong",
            isSuccess: false,
            status: 404,
          };
        }
        bills = [...tmpBills];
      }
      if (employeeId) {
        bills = bills.filter((e) => e.EmployeeId == employeeId);
      }
      return { bills, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  getSoldByCustomer: async (from, to, customerId) => {
    try {
      let bills = [];
      if (!to) {
        const tmpBills = await Bill.findAll({
          where: {
            [Op.and]: Sequelize.where(
              Sequelize.fn("date", Sequelize.col("orderDate")),
              from
            ),
            type: "success",
          },
          include: [
            {
              model: Customer,
              include: [
                {
                  model: HomeAddress,
                  include: [
                    {
                      model: Ward,
                      include: [
                        { model: District, include: [{ model: City }] },
                      ],
                    },
                  ],
                },
                {
                  model: TypeCustomer,
                },
              ],
            },
            {
              model: PromotionResult,
            },
          ],
        });
        if (!tmpBills) {
          return {
            message: "bills not found in that date",
            isSuccess: false,
            status: 404,
          };
        }
        bills = [...tmpBills];
      }
      if (from && to) {
        const fromDate = new Date(from);
        const toDate = new Date(to);
        toDate.setDate(toDate.getDate() + 1);
        const tmpBills = await Bill.findAll({
          where: {
            orderDate: { [Op.between]: [fromDate, toDate] },
            type: "success",
          },
          include: [
            {
              model: Customer,
              include: [
                {
                  model: HomeAddress,
                  include: [
                    {
                      model: Ward,
                      include: [
                        { model: District, include: [{ model: City }] },
                      ],
                    },
                  ],
                },
                {
                  model: TypeCustomer,
                },
              ],
            },
            {
              model: PromotionResult,
            },
          ],
        });
        if (!tmpBills) {
          return {
            message: "not found",
            isSuccess: false,
            status: 404,
          };
        }
        bills = [...tmpBills];
      }
      if (customerId) {
        bills = bills.filter((e) => e.CustomerId == customerId);
      }
      return { bills, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  getRetrieveBill: async (from, to) => {
    try {
      if (!to) {
        const bills = await Bill.findAll({
          where: {
            [Op.and]: Sequelize.where(
              Sequelize.fn("date", Sequelize.col("orderDate")),
              from
            ),
            type: "retrieve",
          },
          include: [
            {
              model: RetrieveBill,
            },
            {
              model: BillDetail,
              include: [
                {
                  model: Price,
                  include: [
                    {
                      model: ProductUnitType,
                      include: [
                        { model: Product, include: [{ model: SubCategory }] },
                        { model: UnitType },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        });
        if (!bills) {
          return {
            message: "bills not found in that date",
            isSuccess: false,
            status: 404,
          };
        }
        return { bills, isSuccess: true, status: 200 };
      }
      const fromDate = new Date(from);
      const toDate = new Date(to);
      toDate.setDate(toDate.getDate() + 1);
      const bills = await Bill.findAll({
        where: {
          orderDate: { [Op.between]: [fromDate, toDate] },
          type: "retrieve",
        },
        include: [
          {
            model: RetrieveBill,
          },
          {
            model: BillDetail,
            include: [
              {
                model: Price,
                include: [
                  {
                    model: ProductUnitType,
                    include: [
                      { model: Product, include: [{ model: SubCategory }] },
                      { model: UnitType },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      });
      if (!bills) {
        return { message: "not found", isSuccess: false, status: 404 };
      }
      return { bills, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
};
module.exports = services;
