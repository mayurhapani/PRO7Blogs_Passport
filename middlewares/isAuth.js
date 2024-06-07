const isAuth = (req, res, next) => {
  console.log("isAuth", req.isAuthenticated()); //testing
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

module.exports = { isAuth };
