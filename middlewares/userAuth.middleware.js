const userModel = require("../models/user.model");

const isLogin = async (req, res, next) => {
  try {
    // console.log("middleware");

    if (!req.cookies.token) {
      res.redirect("/login");
      return;
    }
    // console.log(req.cookies.token);
    const user = await userModel.findOne({ _id: req.cookies.token });
    if (user) {
      req.user = user;
      console.log("login successful (by middleware )");
      next();
    } else {
      console.log("invalid input");
      res.redirect("/login");
      return;
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { isLogin };
