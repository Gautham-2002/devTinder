const adminAuth = (req, res, next) => {
  console.log("admin auth is getting checked");
  const token = "token";
  const isAuthorized = token === "token";
  if (isAuthorized) {
    next();
  } else {
    res.status(401).send("Unauthorized request");
  }
};

const userAuth = (req, res, next) => {
  console.log("admin auth is getting checked");
  const token = "token";
  const isAuthorized = token === "token";
  if (isAuthorized) {
    next();
  } else {
    res.status(401).send("Unauthorized request");
  }
};

module.exports = {
  adminAuth,
  userAuth,
};
