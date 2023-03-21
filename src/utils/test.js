// const data = require("./dvhc.json");
// const city = data.data;
// const x = city.values();
// const onlyCites = city.map((item) => {
//   return {
//     id: item.level1_id,
//     name: item.name,
//     type: item.type,
//   };
// });
// // console.log(city.entries())
// for (const e of x) {
//   console.log(e);
// }
// console.log("city",city)
// console.log(onlyCites)

let data = [
  {
    level1_id: "01",
    name: "Thành phố Hà Nội",
    type: "Thành phố Trung ương",
    level2s: [
      {
        level2_id: "001",
        name: "Quận Ba Đình",
        type: "Quận",
        level3s: [
          {
            level3_id: "00025",
            name: "Phường Ngọc Khánh",
            type: "Phường",
          },
          {
            level3_id: "00028",
            name: "Phường Kim Mã",
            type: "Phường",
          },
          {
            level3_id: "00031",
            name: "Phường Giảng Võ",
            type: "Phường",
          },
          {
            level3_id: "00034",
            name: "Phường Thành Công",
            type: "Phường",
          },
        ],
      },
    ],
  },
  {
    level1_id: "02",
    name: "Tỉnh Hà Giang",
    type: "Tỉnh",
    level2s: [
      {
        level2_id: "024",
        name: "Thành phố Hà Giang",
        type: "Thành phố",
        level3s: [
          {
            level3_id: "00688",
            name: "Phường Quang Trung",
            type: "Phường",
          },
          {
            level3_id: "00691",
            name: "Phường Trần Phú",
            type: "Phường",
          },
          {
            level3_id: "00692",
            name: "Phường Ngọc Hà",
            type: "Phường",
          },
          {
            level3_id: "00694",
            name: "Phường Nguyễn Trãi",
            type: "Phường",
          },
        ],
      },
    ],
  },
];

let lv1 = [];
let lv2 = [];
let lv3 = [];

let a = data.map((item) => {
  //   console.log(item.level2s);
  lv1.push({
    id: item.level1_id,
    name: item.name,
  });

  item.level2s.map((lv2_item) => {
    lv2_item.level3s.map((lv3_item) => {
      lv3.push({
        id: lv3_item.level3_id,
        name: lv3_item.name,
        districtId: lv2_item.level2_id,
      });
    });

    lv2.push({
      id: lv2_item.level2_id,
      name: lv2_item.name,
      cityId: item.level1_id,
    });
  });
});

console.log(lv1);
console.log(lv2);
console.log(lv3);
