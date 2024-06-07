const { Router } = require("express");
const postRouter = Router();

const { isLogin } = require("../middlewares/userAuth.middleware");
const { imageUpload } = require("../middlewares/fileUpload.middleware");
const { postInput } = require("../middlewares/postInput.middleware");
const {
  myPost,
  likePost,
  editPost,
  editPostPage,
  deletePost,
  addPost,
  addPostpage,
} = require("../controllers/post.controller");

postRouter.get("/addPost", isLogin, myPost);
postRouter.get("/addpostpage", isLogin, addPost);

postRouter.post("/addpostpage", isLogin, imageUpload, postInput, addPostpage);

postRouter.get("/likePost/:id", isLogin, likePost);
postRouter.get("/editPost/:id", isLogin, editPost);
postRouter.get("/deletePost/:id", isLogin, deletePost);

postRouter.post("/editPost/:id", isLogin, imageUpload, postInput, editPostPage);

module.exports = { postRouter };
