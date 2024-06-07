const { Router } = require("express");
const router = Router();

const { userInput } = require("../middlewares/userInput.middleware");

const { imageUpload } = require("../middlewares/fileUpload.middleware");
const { isAuth } = require("../middlewares/isAuth");
const passport = require("passport");

const {
  addUser,
  addUserPage,
  login,
  edituser,
  editUserPage,
  allBlogs,
  myblogs,
  deleteuser,
} = require("../controllers/user.controller");

router.get("/addUser", addUser);
router.get("/login", login);
router.get("/edituser", isAuth, edituser);
router.get("/", isAuth, allBlogs);
router.get("/myblogs", isAuth, myblogs);
router.get("/deleteUser", isAuth, deleteuser);

router.post("/addUser", imageUpload, userInput, addUserPage);
router.post("/editeduser", isAuth, imageUpload, userInput, editUserPage);

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
