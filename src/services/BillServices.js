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
  Category,
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
          // raw: true,s
          include: [
            {
              model: Employee,
            },
            {
              model: PromotionResult,
            },
          ],
        });
        if (!tmpBills.length) {
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
          attributes: ["orderDate", "cost", "EmployeeId"],
          include: [
            {
              model: Employee,
              attributes: ["name"],
            },
            {
              model: PromotionResult,
              attributes: [
                "discountMoneyByMoneyPromotion",
                "discountMoneyByVoucher",
              ],
            },
          ],
        });
        if (!tmpBills.length) {
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
      bills = bills.map((e) => {
        let discount = e.PromotionResults.reduce((accumulator, object) => {
          return (
            accumulator +
            object.discountMoneyByMoneyPromotion +
            object.discountMoneyByVoucher
          );
        }, 0);
        return {
          orderDate: e.orderDate,
          cost: e.cost,
          employeeId: e.EmployeeId,
          employeeName: e.Employee.name,
          discount: discount,
          beforeDiscount: discount + e.cost,
        };
      });
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
              attributes: ["id", "firstName", "lastName"],
              include: [
                {
                  model: HomeAddress,
                  attributes: ["homeAddress"],
                  include: [
                    {
                      model: Ward,
                      attributes: ["name"],
                      include: [
                        {
                          model: District,
                          attributes: ["name"],
                          include: [{ model: City, attributes: ["name"] }],
                        },
                      ],
                    },
                  ],
                },
                {
                  model: TypeCustomer,
                  attributes: ["name"],
                },
              ],
            },
            {
              model: PromotionResult,
              attributes: [
                "discountMoneyByVoucher",
                "discountMoneyByMoneyPromotion",
              ],
            },
            {
              model: BillDetail,
              attributes: ["id"],
              include: [
                {
                  model: Price,
                  attributes: ["id"],
                  include: [
                    {
                      model: ProductUnitType,
                      attributes: ["id"],
                      include: [
                        {
                          model: Product,
                          attributes: ["id"],
                          include: [
                            {
                              model: SubCategory,
                              attributes: ["name"],
                              include: [
                                { model: Category, attributes: ["name"] },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
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
              attributes: ["id", "firstName", "lastName"],
              include: [
                {
                  model: HomeAddress,
                  attributes: ["homeAddress"],
                  include: [
                    {
                      model: Ward,
                      attributes: ["name"],
                      include: [
                        {
                          model: District,
                          attributes: ["name"],
                          include: [{ model: City, attributes: ["name"] }],
                        },
                      ],
                    },
                  ],
                },
                {
                  model: TypeCustomer,
                  attributes: ["name"],
                },
              ],
            },
            {
              model: PromotionResult,
              attributes: [
                "discountMoneyByVoucher",
                "discountMoneyByMoneyPromotion",
              ],
            },
            {
              model: BillDetail,
              attributes: ["id"],
              include: [
                {
                  model: Price,
                  attributes: ["id"],
                  include: [
                    {
                      model: ProductUnitType,
                      attributes: ["id"],
                      include: [
                        {
                          model: Product,
                          attributes: ["id"],
                          include: [
                            {
                              model: SubCategory,
                              attributes: ["name"],
                              include: [
                                { model: Category, attributes: ["name"] },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
          group: ['Customer.id'],
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
        bills = bills.filter((e) => e.CustomerId.startsWith(customerId));
      }
      bills = bills.map((e) => {
        let discount = e.PromotionResults.reduce((accumulator, object) => {
          return (
            accumulator +
            object.discountMoneyByMoneyPromotion +
            object.discountMoneyByVoucher
          );
        }, 0);
        let subCategories = [];
        let categories = [];
        e.BillDetails.forEach((element) => {
          subCategories.push(
            element.Price.ProductUnitType.Product.SubCategory.name
          );
          categories.push(
            element.Price.ProductUnitType.Product.SubCategory.Category.name
          );
        });
        return {
          customerId: e.CustomerId,
          customerName:
          e.Customer.firstName && e.Customer.lastName
          ? e.Customer.firstName + e.Customer.lastName
          : "",
          address: e.Customer.HomeAddress
          ? e.Customer.HomeAddress.homeAddress
          : "",
          ward: e.Customer.HomeAddress ? e.Customer.HomeAddress.Ward.name : "",
          district: e.Customer.HomeAddress
          ? e.Customer.HomeAddress.Ward.District.name
          : "",
          city: e.Customer.HomeAddress
          ? e.Customer.HomeAddress.Ward.District.City.name
          : "",
          typeCustomer: e.Customer.TypeCustomer.name,
          discount: discount,
          categories: categories,
          subCategories: subCategories,
          beforeDiscount: discount + e.cost,
          cost: e.cost,
        };
      });
      return { bills, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  getRetrieveBill: async (from, to) => {
    try {
      // if (!to) {
      //   const bills = await Bill.findAll({
      //     where: {
      //       [Op.and]: Sequelize.where(
      //         Sequelize.fn("date", Sequelize.col("orderDate")),
      //         from
      //       ),
      //       type: "retrieve",
      //     },
      //     include: [
      //       {
      //         model: RetrieveBill,
      //       },
      //       {
      //         model: BillDetail,
      //         include: [
      //           {
      //             model: Price,
      //             include: [
      //               {
      //                 model: ProductUnitType,
      //                 include: [
      //                   { model: Product, include: [{ model: SubCategory }] },
      //                   { model: UnitType },
      //                 ],
      //               },
      //             ],
      //           },
      //         ],
      //       },
      //     ],
      //   });
      //   if (!bills) {
      //     return {
      //       message: "bills not found in that date",
      //       isSuccess: false,
      //       status: 404,
      //     };
      //   }
      //   return { bills, isSuccess: true, status: 200 };
      // }
      const fromDate = new Date(from);
      const toDate = new Date(to);
      toDate.setDate(toDate.getDate() + 1);
      let bills = await Bill.findAll({
        where: {
          orderDate: { [Op.between]: [fromDate, toDate] },
          type: "retrieve",
        },
        attributes: ["id", "orderDate"],
        include: [
          {
            model: RetrieveBill,
            attributes: ["id", "createAt"],
          },
          {
            model: BillDetail,
            attributes: ["quantity"],
            include: [
              {
                model: Price,
                attributes: ["id", "price"],
                include: [
                  {
                    model: ProductUnitType,
                    include: [
                      {
                        model: Product,
                        attributes: ["id", "name"],
                        include: [
                          {
                            model: SubCategory,
                            attributes: ["name"],
                            include: [
                              { model: Category, attributes: ["name"] },
                            ],
                          },
                        ],
                      },
                      { model: UnitType, attributes: ["id", "name"] },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      });
      if (!bills.length) {
        return { message: "not found", isSuccess: false, status: 404 };
      }
      bills = bills.map((e) => {
        let products = e.BillDetails.map((element) => {
          let totalMoney = element.quantity * element.Price.price;
          return {
            billId: e.id,
            orderDate: e.orderDate,
            retrieveBillId: e.RetrieveBill.id,
            retrieveDate: e.RetrieveBill.createAt,
            category:
              element.Price.ProductUnitType.Product.SubCategory.Category.name,
            subCategory: element.Price.ProductUnitType.Product.SubCategory.name,
            productId: element.Price.ProductUnitType.ProductId,
            productName: element.Price.ProductUnitType.Product.name,
            quantity: element.quantity,
            unitType: element.Price.ProductUnitType.UnitType.name,
            totalMoney: totalMoney,
          };
        });
        return products;
      });
      bills = bills.flat();
      return { bills, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
};
module.exports = services;
