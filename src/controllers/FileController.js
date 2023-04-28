const fs = require("fs");
const FileController = {
  get: async (req, res) => {
    var file = fs.readFileSync(__dirname + "/reportFile.xlsx", "binary");

    res.setHeader("Content-Length", file.length);
    res.write(file, "binary");
    res.end();
  },
};

module.exports = FileController;
