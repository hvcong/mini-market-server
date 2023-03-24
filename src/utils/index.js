// các hàm
// const Category = require("../models/Category");
// const Price = require("../models/Price");
// const Product = require("../models/Product");
// const SubCategory = require("../models/SubCategory");
// const UnitType = require("../models/UnitType");
// const ProductServices = require("../services/ProductServices");
// const subServices = require("../services/SubCategoryServices");
// const priceService = require("../services/PriceServices");
// const ListPricesHeader = require("../models/ListPricesHeader");
// const { add } = require("../services/ListPricesHeaderServices");

const db = require("../config/persist");

const cateData = [
  {
    id: "ct001",
    name: "Nước giải khát",
    image:
      "https://vinmec-prod.s3.amazonaws.com/images/20211218_114300_993458_an-tao-luc-nao-tot-.max-1800x1800.jpg",
    state: true,
  },
  {
    id: "ct002",
    name: "Gia vị",
    image:
      "https://vinmec-prod.s3.amazonaws.com/images/20211218_114300_993458_an-tao-luc-nao-tot-.max-1800x1800.jpg",
    state: true,
  },
  {
    id: "ct003",
    name: "Dụng cụ vệ sinh",
    image:
      "https://vinmec-prod.s3.amazonaws.com/images/20211218_114300_993458_an-tao-luc-nao-tot-.max-1800x1800.jpg",
    state: true,
  },
  {
    id: "ct004",
    name: "Dụng cụ bếp",
    image:
      "https://vinmec-prod.s3.amazonaws.com/images/20211218_114300_993458_an-tao-luc-nao-tot-.max-1800x1800.jpg",
    state: true,
  },
];

const subCateData = [
  {
    id: " sub1",
    name: "Nước có ga",
    state: true,
    categoryId: "ct001",
  },
  {
    id: " sub2",
    name: "Nước không có ga",
    state: true,
    categoryId: "ct001",
  },
  {
    id: " sub3",
    name: "Nước mắm",
    state: true,
    categoryId: "ct002",
  },
  {
    id: " sub4",
    name: "Bột ngọt",
    state: true,
    categoryId: "ct002",
  },
];

const productData = new Array(20).fill(null).map((item, index) => {
  return {
    id: "sp" + index,
    name: "Coca Cola",
    images: [
      "https://vinmec-prod.s3.amazonaws.com/images/20211218_114300_993458_an-tao-luc-nao-tot-.max-1800x1800.jpg",
      "https://vinmec-prod.s3.amazonaws.com/images/20211218_114300_993458_an-tao-luc-nao-tot-.max-1800x1800.jpg",
    ],
    description: "các sản phẩm",
    state: true,
    subCategoryId: "sub1",
    unitTypes: [{ id: "L1" }, { id: "L6" }, { id: "T24" }],
  };
});

const priceHeaderData = new Array(20).fill(null).map((item, index) => {
  return {
    id: "H" + index,
    title: "bang gia thang" + index,
    startDate: "2023/3/1",
    endDate: "2023/4/1",
    state: true,
  };
});
const unitTypeData = [
  {
    id: "T24",
    name: "thung 24",
    convertionQuantity: 24,
  },
  {
    id: "T12",
    name: "thung 12",
    convertionQuantity: 12,
  },
  {
    id: "L6",
    name: "Loc 6",
    convertionQuantity: 6,
  },
  {
    id: "L1",
    name: "Loc ",
    convertionQuantity: 6,
  },
];

const priceData = new Array(20).fill(null).map((item, index) => {
  return {
    price: 2222,
    headerId: "H1",
    productUnitTypeId: index,
  };
});

const promotion = new Array(10).fill(null).map((item, index) => {
  return {
    id: "P" + index,
    title: "Chương trình khuyến mãi tháng 3",
    description: "abc",
    startDate: "2023/3/1",
    endDate: "2023/4/1",
    budget: 10000000,
    availableBudget: 10000000,
    state: 1,
    customerIds: [{ id: "type1" }, { id: "type2" }],
  };
});
const productPromotion = new Array(10).fill(null).map((item, index) => {
  return {
    id: "prm" + index,
    title: "khuyễn mãi tặng quà",
    description: "khuyễn mãi",
    startDate: "2023/3/1",
    endDate: "2023/4/1",
    minQuantity: "6",
    state: true,
    ProductUnitTypeId: 1,
    PromotionHeaderId: "p1",
  };
});
const moneyPromotion = new Array(10).fill(null).map((item, index) => {
  return {
    id: "MNP" + index,
    title: "khuyen mai tien",
    description: "qua dang cap",
    startDate: "2023/3/1",
    endDate: "2023/4/1",
    minCost: 300000,
    discountMoney: 50000,
    discountRate: null,
    maxDiscountMoney: 500000,
    state: true,
    PromotionHeaderId: "p1",
  };
});
const giftProduct = new Array(10).fill(null).map((item, index) => {
  return {
    id: "G" + index,
    quantity: 1,
    ProductUnitTypeId: 1,
    ProductPromotionId: "prm1",
  };
});
const discountRate = new Array(10).fill(null).map((item, index) => {
  return {
    id: "D" + index,
    title: "giảm giá sản phẩm ",
    description: "kích cầu mua sắm",
    startDate: "2023/3/1",
    endDate: "2023/4/1",
    discountRate: 7.8,
    state: true,
    ProductUnitTypeId: 18,
    PromotionHeaderId: "p1",
  };
});
const bill = new Array(10).fill(null).map((item, index) => {
  return {
    cost: 200000,
    customerPhonenumber: "0356267135",
    EmployeeId: 1,
    priceIds: [1, 2, 3, 4, 5],
    voucherId: null,
  };
});

const { lv1, lv2, lv3 } = require("./test");

const home = new Array(10).fill(null).map((item, index) => {
  return {
    homeAddress: index + "- St Paul street",
    wardId: "00001",
  };
});
const store = new Array(10).fill(null).map((item, index) => {
  return {
    quantity: 100,
    productId: "sp" + index,
    type: "Nhập kho",
    employeeId: 1,
  };
});

const warehouseticket = {
  EmployeeId: 1,
  ticketDetails: [
    {
      reportQty: 63,
      realQty: 36,
      ProductId: "sp1",
    },
    {
      reportQty: 63,
      realQty: 36,
      ProductId: "sp2",
    },
  ],
};
const typeCustomers = [
  {
    id: "Type1",
    name: "Khách hàng vàng",
  },
  {
    id: "Type2",
    name: "Khách hàng bạc",
  },
  {
    id: "Type3",
    name: "Khách hàng đồng",
  },
];

console.log(lv1.length);
async function generateData() {
  //city
  await db.City.destroy({ where: {} });
  await db.City.bulkCreate(lv1);

  //district
  // await db.District.destroy({ where: {} });
  // await db.District.bulkCreate(lv2)

  // await db.Ward.destroy({ where: {} });
  // await db.Ward.bulkCreate(lv3)

  //category
  //------
  // await Category.destroy({
  //   where: {},
  // });
  // await Category.bulkCreate(cateData);
  // //sub category
  // //------
  // await SubCategory.destroy({
  //   where: {},
  // });
  // for (let obj of subCateData) {
  //   await subServices.add(obj);
  // }
  // // // unit-type
  // //------
  // await UnitType.destroy({
  //   where: {},
  // });
  // await UnitType.bulkCreate(unitTypeData);
  // //------

  // await Product.destroy({
  //   where: {},
  // });
  // for (let obj of productData) {
  //   await ProductServices.addProduct(obj);
  // }

  // //------
  // await Price.destroy({
  //   where: {},
  // });
  // for (let obj of priceData) {
  //   await priceService.addPrice(obj);
  // }

  // //--- priceHeader
  // await ListPricesHeader.destroy();
  // for (const e of priceHeaderData) {
  //   await add(e);
  // }
}
