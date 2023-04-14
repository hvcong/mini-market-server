const { Image } = require("../config/persist");

const services = {
  create: async (data) => {
    try {
      const arr = data.map((e) => ({ uri: e }));
      const uris = await Image.bulkCreate(arr);
      return uris;
    } catch (error) {
      console.log(error);
      return { message: "something went wrong", isSuccess: false };
    }
  },
  deleteImagesByProductId: async (productId) => {
    try {
      await Image.destroy({
        where: {
          ProductId: productId,
        },
      });
    } catch (error) {
      return { message: "something went wrong", isSuccess: false };
    }
  },
};
module.exports = services;
