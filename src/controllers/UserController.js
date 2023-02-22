const db = require("../config/persist");
const User = db.User;

const UserController = {
  addNewUser: async (req, res) => {},
  updateUser: async (req, res) => {
    try {
      const id = req.params.id;
      const newData = req.body;
      console.log(newData);
      const user = await User.findOne({ where: { id: id } });
      console.log(user);
      if (user) {
        await user.update(newData);
        await user.save();
        return res.status(200).json({ result: "updated successfully", user });
      } else {
        return res.status(403).json({ result: "User not found" });
      }
    } catch (error) {
      console.log(error);
      return res.status(400).json("update failed");
    }
  },
  deleteUser: async (req, res) => {
    try {
      const id = req.params.id;
      await User.findOne({ where: { id: id } }).then((user) => user.destroy());
      return res.status(200).json("deleted successfully");
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "user not found", result: false });
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const users = User.findAll({ limit: 10, order: "lastName" });
      return res.status(200).json(users);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "somthing goes wrong", result: false });
    }
  },
  getUserByPhonenumber: async (req, res) => {
    try {
      const phonenumber = req.params.phonenumber;
      const user = User.findOne({ where: { phonenumber: phonenumber } });
      if (user) {
        return res.status(200).json(user);
      } else {
        return res
          .status(404)
          .json({ message: "user not found", result: false });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "somthing goes wrong", result: false });
    }
  },
  getUserByName: async (req, res) => {
    try {
      const username = req.body.username
      const userByName = User.findAll({where: {}})
    } catch (error) {
      console.log(error)
      return res.status(500).json({message:'somgthing goes wrong',result: false})
    }
  },
};
module.exports = UserController;
