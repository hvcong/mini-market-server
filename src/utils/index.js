const City = require("../models/City");
const District = require("../models/District");
const services = require("../services/WardServices");

const { lv1, lv2, lv3 } = require("./test");


module.exports = async function generateData() {
  await City.bulkCreate(lv1);
  //district
  await District.bulkCreate(lv2);
  // //ward
  lv3.map(async (item, index) => {
    await services.addWard({
      id: item.id,
      name: item.name,
      districtId: item.DistrictId,
    });
  });
};

