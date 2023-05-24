const { Op, DATE } = require("sequelize");
const {
  ListPricesHeader,
  Price,
  ProductUnitType,
  Product,
  UnitType,
  Image,
  ProductPromotion,
  GiftProduct,
  DiscountRateProduct,
  PromotionHeader,
  TypeCustomer,
} = require("../config/persist");
const {
  createBulkPrice,
  updateManyPrice,
} = require("../services/PriceServices");
const sequelize = require("../config/database");

const services = {
  add: async (data) => {
    try {
      const { id, ...newData } = data;
      var header = await ListPricesHeader.findOne({ where: { id: id } });
      if (header) {
        return {
          message: "price header already exists",
          isSuccess: false,
          status: 403,
        };
      }
      header = await ListPricesHeader.create({
        id,
        ...newData,
      });
      return { header, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  update: async (data) => {
    const { id, ...newData } = data;
    try {
      const header = await ListPricesHeader.findOne({
        where: { id: id },
      });

      if (header) {
        await header.update({ ...newData });
        await header.save();
        return { message: "updated succesful", isSuccess: true, status: 200 };
      } else {
        return { message: "price not found", isSuccess: false, status: 404 };
      }
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  delete: async (id) => {
    try {
      const header = await ListPricesHeader.findOne({
        where: { id: id },
      });
      if (header) {
        await header.destroy();
        return { message: " deleted succesful", isSuccess: true, status: 200 };
      } else {
        return { message: "not found", isSuccess: false, status: 404 };
      }
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
      const headers = await ListPricesHeader.findAndCountAll({
        limit: limit,
        offset: offset,
        distinct: true,
        order: [["createdAt", "DESC"]],
      });
      return { headers, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  getById: async (id) => {
    try {
      const header = await ListPricesHeader.findOne({
        where: {
          id: id,
        },
        include: [
          {
            model: Price,
            include: [
              {
                model: ProductUnitType,
                include: [{ model: Product }, { model: UnitType }],
              },
            ],
          },
        ],
      });
      if (header) {
        return { header, isSuccess: true, status: 200 };
      }
      return { message: "header not found", isSuccess: false, status: 404 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  getAllOnActive: async () => {
    try {
      const headers = await ListPricesHeader.findAll({
        where: {
          state: true,
        },
        include: [
          {
            model: Price,
            include: [
              {
                model: ProductUnitType,
                include: [
                  { model: Product, include: [{ model: Image, as: "images" }] },
                  { model: UnitType },
                ],
              },
            ],
          },
        ],
      });

      return { headers, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  getAllOnActive2: async () => {
    try {
      const headers = await ListPricesHeader.findAll({
        where: {
          state: true,
        },
        include: [
          {
            model: Price,
            include: [
              {
                model: ProductUnitType,
                include: [
                  { model: Product, include: [{ model: Image, as: "images" }] },
                  { model: UnitType },
                  {
                    model: ProductPromotion,
                    include: [
                      {
                        model: PromotionHeader,
                        include: [{ model: TypeCustomer }],
                      },
                      {
                        model: GiftProduct,
                        include: [
                          {
                            model: ProductUnitType,
                            include: [
                              { model: UnitType },
                              {
                                model: Product,
                                include: [{ model: Image, as: "images" }],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        model: ProductUnitType,
                        include: [
                          { model: UnitType },
                          {
                            model: Product,
                            include: [{ model: Image, as: "images" }],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    model: DiscountRateProduct,
                    include: [
                      {
                        model: PromotionHeader,
                        include: [{ model: TypeCustomer }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      });

      // lấy những bảng giá đang áp dụng
      let newHeaders = headers.filter((header) => {
        let start = new Date(header.dataValues.startDate);
        let end = new Date(header.dataValues.endDate);
        let now = new Date();

        return compareDMY(start, now) <= 0 && compareDMY(end, now) >= 0;
      });

      return { headers: newHeaders, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
};

function compareDMY(jsDate1, jsDate2) {
  let d1 = jsDate1.getDate();
  let m1 = jsDate1.getMonth();
  let y1 = jsDate1.getFullYear();

  let d2 = jsDate2.getDate();
  let m2 = jsDate2.getMonth();
  let y2 = jsDate2.getFullYear();

  if (y1 == y2 && m2 == m1 && d1 == d2) {
    return 0;
  }

  if (y1 < y2) {
    return -1;
  }

  if (y2 == y1) {
    if (m1 < m2) {
      return -1;
    } else if (m2 == m1) {
      if (d1 < d2) {
        return -1;
      } else {
        return 1;
      }
    } else {
      return 1;
    }
  }

  return 1;
}

module.exports = services;
