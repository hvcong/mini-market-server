const {
  Input,
  Employee,
  InputDetail,
  ProductUnitType,
} = require("../config/persist");
const { createManyDetails } = require("./InputDetailsServices");

const services = {
  add: async (data) => {
    try {
      const { inputDetails, ...others } = data;
      const { id } = others;
      let input = await Input.findByPk(id);
      if (input) {
        return {
          message: "duplicate primary key",
          isSuccess: false,
          status: 400,
        };
      }
      input = await Input.create(others);
      const details = await createManyDetails(inputDetails);
      await input.setInputDetails(details);
      return { input, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  update: async (data) => {
    try {
        const {id,...others} = data
      const input = await Input.findByPk(id);
      if (input) {
        await input.update(others);
        await input.save();
        return { message: "updated succesful", isSuccess: true, status: 200 };
      }
      return { message: "input not found", isSuccess: false, status: 404 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  getOne: async (id) => {
    try {
      const input = await Input.findOne({
        where: { id: id },
        include: [
          { model: Employee },
          { model: InputDetail, include: [{ model: ProductUnitType }] },
        ],
      });

      if (input) {
        return { input, isSuccess: true, status: 200 };
      }
      return { message: "input not found", isSuccess: false, status: 404 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
  get: async (query) => {
    const page = (query._page && Number(query._page)) || 1;
    const limit = (query._limit && Number(query._limit)) || 20;
    var offset = (page - 1) * limit;
    try {
      const inputs = await Input.findAndCountAll({
        limit: limit,
        offset: offset,
        order: [["updatedAt", "DESC"]],
        distinct: true,
        include: [
          { model: Employee },
          {
            model: InputDetail,
            include: [
              {
                model: ProductUnitType,
              },
            ],
          },
        ],
      });
      return { inputs, isSuccess: true, status: 200 };
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false, status: 500 };
    }
  },
};

module.exports = services