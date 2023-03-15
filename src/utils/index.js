// các hàm
const Category = require("../models/Category");
const Price = require("../models/Price");
const Product = require("../models/Product");
const SubCategory = require("../models/SubCategory");
const UnitType = require("../models/UnitType");
const ProductServices = require("../services/ProductServices");
const subServices = require("../services/SubCategoryServices");
const priceService = require("../services/PriceServices");

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
    id: "ct-ngk1",
    name: "Nước có ga",
    state: true,
    categoryId: "ct001",
  },
  {
    id: "ct-ngk2",
    name: "Nước không có ga",
    state: true,
    categoryId: "ct001",
  },
  {
    id: "ct-ngk3",
    name: "Nước mắm",
    state: true,
    categoryId: "ct002",
  },
  {
    id: "ct-ngk4",
    name: "Bột ngọt",
    state: true,
    categoryId: "ct002",
  },
];

const productData = new Array(20).fill(null).map((item, index) => {
  return {
    id: "P" + index,
    name: "Calo Caco " + index,
    images: [
      "https://vinmec-prod.s3.amazonaws.com/images/20211218_114300_993458_an-tao-luc-nao-tot-.max-1800x1800.jpg",
      "https://vinmec-prod.s3.amazonaws.com/images/20211218_114300_993458_an-tao-luc-nao-tot-.max-1800x1800.jpg",
    ],
    description:
      "Sản phẩm Cọ tròn 0005 Thuận Thành được làm bằng nhựa PP kết hợp với thân inox siêu bền là công cụ đắc lực hỗ trợ bạn trong việc vệ sinh nhà cửa. Sản phẩm được loại bỏ tạp chất nên tuổi thọ cao, rất thân thiện với môi trường và an toàn cho sức khỏe người sử dụng.",
    quantity: 100,
    state: index % 2 == 0,
    subCategoryId: "ct-ngk1",
    unitTypes: [{name: "lon",convertionQuantity: 1}, {name:"loc6",convertionQuantity: 6}]
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
    id: "T6",
    name: "Lốc 6",
    convertionQuantity: 6,
  },
];

const priceData = new Array(20).fill(null).map((item, index) => {
  return {
    id: "PR" + index,
    productId: "P" + index,
    unitTypeId: "T24",
    endDate: "2023/4/1",
    price: 10000,
    state: index % 2 == 0,
  };
});

module.exports = async function generateData() {
  //category
  //------
  await Category.destroy({
    where: {},
  });
  await Category.bulkCreate(cateData);
  //sub category
  //------
  await SubCategory.destroy({
    where: {},
  });
  for (let obj of subCateData) {
    await subServices.add(obj);
  }
  // // unit-type
  //------
  await UnitType.destroy({
    where: {},
  });
  await UnitType.bulkCreate(unitTypeData);
  //------

  await Product.destroy({
    where: {},
  });
  for (let obj of productData) {
    await ProductServices.addProduct(obj);
  }

  //------
  await Price.destroy({
    where: {},
  });
  for (let obj of priceData) {
    await priceService.addPrice(obj);
  }
};
