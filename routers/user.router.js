const { Router } = require("express");
const router = Router();

const { isLogin } = require("../middlewares/userAuth.middleware");
const { userInput } = require("../middlewares/userInput.middleware");

const { imageUpload } = require("../middlewares/fileUpload.middleware");
const { isAuth } = require("../middlewares/isAuth");
const passport = require("passport");

const {
  addUser,
  addUserPage,
  login,
  loginAuth,
  logout,
  edituser,
  editUserPage,
  allBlogs,
  myblogs,
  deleteuser,
} = require("../controllers/user.controller");

router.get("/addUser", addUser);
router.get("/login", login);
router.get("/edituser", isLogin, edituser);
router.get("/", isAuth, allBlogs);
router.get("/myblogs", isLogin, myblogs);
router.get("/deleteUser", isLogin, deleteuser);

router.post("/addUser", imageUpload, userInput, addUserPage);
router.post("/editeduser", isLogin, imageUpload, userInput, editUserPage);

// router.post("/login", loginAuth);
// router.get("/logout", logout);

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);
router.get("/logout", (req, res, next) => {
  console.log("logout");
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.clearCookie("connect.sid");
      res.redirect("/login");
    });
  });
});

module.exports = { router };
