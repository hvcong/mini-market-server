const services = require("../aws/S3");

const controller = {
  upload: async (req, res) => {
    const file = req.file;
    try {
      const result = await services.uploadFile(file);
      if (result) {
        return res.status(200).json({ uri: result, isSuccess: true });
      } else {
        return res.status(300).json({
          status: "error",
          isSuccess: false,
        });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ isSuccess: false, message: "something went wrong" });
    }
  },
};

module.exports = controller;
