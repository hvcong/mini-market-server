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
    CategoryId: "ct001",
  },
  {
    id: " sub2",
    name: "Nước không có ga",
    state: true,
    CategoryId: "ct001",
  },
  {
    id: " sub7",
    name: "Nước ép trái cây",
    state: true,
    CategoryId: "ct001",
  },
  {
    id: " sub3",
    name: "Nước mắm",
    state: true,
    CategoryId: "ct002",
  },
  {
    id: " sub4",
    name: "Bột ngọt",
    state: true,
    CategoryId: "ct002",
  },
  {
    id: " sub5",
    name: "Cây lau nhà",
    state: true,
    CategoryId: "ct003",
  },
];

const productData = new Array(20).fill(null).map((item, index) => {
  return {
    id: "sp" + index,
    name: "Coca Cola",
    description:
      "nước giải khát coca cola, vị ngọt, sảng khoái, ngon hơn khi uống lạnh",
    quantity: 0,
    state: true,
    subCategoryId: "sub1",
  };
});

const priceHeaderData = new Array(10).fill(null).map((item, index) => {
  return {
    id: "H" + index,
    title: "Bảng giá tháng " + index,
    startDate: "2023/3/1",
    endDate: "2023/4/1",
    state: true,
  };
});
const unitTypeData = [
  {
    id: "T24",
    name: "Thùng 24",
    convertionQuantity: 24,
  },
  {
    id: "L6",
    name: "Lốc 6",
    convertionQuantity: 6,
  },
  {
    id: "L1",
    name: "Lon ",
    convertionQuantity: 1,
  },
  {
    id: "G1",
    name: "Gói",
    convertionQuantity: 1,
  },
  {
    id: "CH1",
    name: "Chai 1",
    convertionQuantity: 1,
  },
];

const priceData = [
  {
    price: 10000,
    headerId: "H1",
    ProductUnitTypeId: 1,
  },
  {
    price: 54000,
    headerId: "H1",
    ProductUnitTypeId: 2,
  },
  {
    price: 180000,
    headerId: "H1",
    ProductUnitTypeId: 3,
  },
];

const promotionData = new Array(10).fill(null).map((item, index) => {
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

const homeData = new Array(10).fill(null).map((item, index) => {
  return {
    homeAddress: "Number " + index + "- St Paul street",
    WardId: "0000" + (index + 1),
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
const typeCustomerData = [
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

const employeeData = [
  {
    name: "Le Dinh But",
    phonenumber: "0356267135",
    HomeAddressId: 1,
  },
  {
    name: "Hoang Van Cong",
    phonenumber: "0356267136",
    HomeAddressId: 2,
  },
  {
    name: "Nguyen Tien Dat",
    phonenumber: "0356267137",
    HomeAddressId: 3,
  },
];
const customerData = [
  {
    firstName: "cong",
    lastName: "van",
    phonenumber: "0356267140",
    email: "hvcong@gmail.com",
    HomeAddressId: 4,
    TypeCustomerId: "Type1",
  },
  {
    firstName: "But",
    lastName: "Le",
    phonenumber: "0356267141",
    email: "hvcong@gmail.com",
    HomeAddressId: 5,
    TypeCustomerId: "Type2",
  },
  {
    firstName: "cong",
    lastName: "van",
    phonenumber: "0356267142",
    email: "hvcong@gmail.com",
    HomeAddressId: 6,
    TypeCustomerId: "Type3",
  },
];
const productUnittypeData = [
  {
    ProductId: "sp1",
    UnitTypeId: 1,
    state: true,
  },
  {
    ProductId: "sp1",
    UnitTypeId: 2,
    state: true,
  },
  {
    ProductId: "sp1",
    UnitTypeId: 3,
    state: true,
  },
  {
    ProductId: "sp2",
    UnitTypeId: 1,
    state: true,
  },
  {
    ProductId: "sp2",
    UnitTypeId: 2,
    state: true,
  },
  {
    ProductId: "sp2",
    UnitTypeId: 3,
    state: true,
  },
];
async function generateData() {
  //city
  await db.City.destroy({ where: {} });
  await db.City.bulkCreate(lv1);

  //district
  await db.District.destroy({ where: {} });
  await db.District.bulkCreate(lv2);

  //ward
  await db.Ward.destroy({ where: {} });
  await db.Ward.bulkCreate(lv3);

  //home
  await db.HomeAddress.destroy({ where: {} });
  await db.HomeAddress.bulkCreate(homeData);

  //employee
  await db.Employee.destroy({ where: {} });
  await db.Employee.bulkCreate(employeeData);

  //typecustomer
  await db.TypeCustomer.destroy({ where: {} });
  await db.TypeCustomer.bulkCreate(typeCustomerData);

  //customer
  await db.Customer.destroy({ where: {} });
  await db.Customer.bulkCreate(customerData);

  //category
  await db.Category.destroy({ where: {} });
  await db.Category.bulkCreate(cateData);

  //subCategory
  await db.SubCategory.destroy({ where: {} });
  await db.SubCategory.bulkCreate(subCateData);

  //unittype
  await db.UnitType.destroy({ where: {} });
  await db.UnitType.bulkCreate(unitTypeData);

  //product
  await db.Product.destroy({ where: {} });
  await db.Product.bulkCreate(productData);

  //product unittype
  await db.ProductUnitType.destroy({ where: {} });
  await db.ProductUnitType.bulkCreate(productUnittypeData);

  //priceHeader
  await db.ListPricesHeader.destroy({ where: {} });
  await db.ListPricesHeader.bulkCreate(priceHeaderData);

  //price
  await db.Price.destroy({ where: {} });
  await db.Price.bulkCreate(priceData);
}

generateData();
