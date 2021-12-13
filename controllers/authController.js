function authController(req, res, next) {
  if (req.headers.prackey === process.env.pracKey) {
    next();
  } else {
    res.status(401).send({ error: "Unauthorized access!" });
  }
}

export default authController;
