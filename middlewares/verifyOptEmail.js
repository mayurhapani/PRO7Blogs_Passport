const verifyOtpEmail = (req, res, next) => {
  const userEmail = req.cookies.userEmail;
  // console.log("verifyOtpEmail", userEmail);

  if (userEmail) {
    return next();
  }
  res.redirect("/login");
};

module.exports = { verifyOtpEmail };
