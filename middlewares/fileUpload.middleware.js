const multer = require("multer");

const fileUploads = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const imageUpload = multer({ storage: fileUploads }).single("image");

module.exports = { imageUpload };
