const User = require("../models/User");

const userController = {
  // Get all users
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getUsersId: async (req, res) => {
    try {
      const users = await User.findById({
        _id: req.params.userId
      });
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //delete user
  deleteUser: async (req, res) => {
    try {
      await User.remove({ _id: req.params.id });
      res.status(200).json({ message: "Delete Successfully!!!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = userController;
