const dvhc = require('./dvhc.json')
const data = dvhc.data

let lv1 = [];
let lv2 = [];
let lv3 = [];

let a = data.map((item) => {
  lv1.push({
    id: item.level1_id,
    name: item.name,
  });

  item.level2s.map((lv2_item) => {
    lv2_item.level3s.map((lv3_item) => {
      lv3.push({
        id: lv3_item.level3_id,
        name: lv3_item.name,
        DistrictId: lv2_item.level2_id,
      });
    });

    lv2.push({
      id: lv2_item.level2_id,
      name: lv2_item.name,
      CityId: item.level1_id,
    });
  });
});

console.log(lv1);
console.log(lv2);
console.log(lv3);

exports.lv1 = lv1
exports.lv2 = lv2
exports.lv3 = lv3