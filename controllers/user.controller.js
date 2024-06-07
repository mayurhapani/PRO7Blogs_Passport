const postModel = require("../models/post.model");
const userModel = require("../models/user.model");
const fs = require("fs");
const path = require("path");

const allBlogs = async (req, res) => {
  try {
    const user = req.user;
    const posts = await postModel.find({}).populate("user");
    // console.log(posts);
    res.render("index", { user, posts });
  } catch (error) {
    console.log(error);
  }
};

const addUser = async (req, res) => {
  res.render("signup");
};

const addUserPage = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    const image = req.file.path;

    const user = await userModel.findOne({ email });
    if (user)
      return res.status(400).send("User already exist! <br/> Please use other email id......");

    await userModel.create({ name, username, email, password, image });
    res.redirect("/login");
  } catch (err) {
    console.log(err);
  }
};

const login = async (req, res) => {
  res.render("login");
};

const loginAuth = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) return res.status(400).send("User Not exist!");

    if (password !== user.password) return res.redirect("/login");

    res.status(200);
    res.cookie("token", user.id);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.redirect("/login");
  } catch (error) {
    console.log(error);
  }
};

const edituser = async (req, res) => {
  const user = req.user;
  res.render("edituser", { user });
};

const editUserPage = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    const id = req.user._id;
    let image = req.user.image;

    if (req.file) {
      fs.unlinkSync(req.user.image);
      image = req.file.path;
    }
    await userModel.findOneAndUpdate({ _id: id }, { name, username, email, password, image });

    res.redirect("/myblogs");
  } catch (err) {
    console.log(err);
  }
};

const myblogs = async (req, res) => {
  try {
    const user = req.user;
    const myPosts = await postModel.find({ user: user._id });

    res.render("myblogs", { user, myPosts });
  } catch (error) {
    console.log(error);
  }
};

const deleteuser = async (req, res) => {
  try {
    const id = req.user.id;

    let subImagePath = req.user.image.replace(/\\/g, "/");
    if (subImagePath.startsWith("public/")) {
      subImagePath = subImagePath.substring("public/".length);
    }
    const imagePath = path.join(__dirname, "..", "public", subImagePath);

    fs.unlinkSync(imagePath);

    await postModel.deleteMany({ user: id });
    await userModel.findOneAndDelete({ _id: id });
    res.redirect("/login");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  allBlogs,
  addUser,
  addUserPage,
  login,
  loginAuth,
  logout,
  myblogs,
  edituser,
  editUserPage,
  deleteuser,
};
