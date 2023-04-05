const services = require("../aws/S3");

const controller = {
  upload: async (req, res) => {
    const file = req.file;
    try {
      const result = await services.uploadFile(file);

      return res.send({ uri: result });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ isSuccess: false, message: "something went wrong" });
    }
  },
};

module.exports = controller;
