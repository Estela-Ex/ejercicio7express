const checkEmailPassword = require("../utils/checkEmailPassword");
const { SignJWT, jwtVerify } = require("jose");
const { USERS_BBDD } = require("../bbdd.js");

const controller = {};

controller.authUser = async (req, res) => {
  const { email, password } = req.body;
   try {
    const { guid } = checkEmailPassword(email, password);
    const jwtConstructor = new SignJWT({ guid });
    const encoder = new TextEncoder();
    const jwt = await jwtConstructor
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(encoder.encode(process.env.JWT_SECRET));
    return res.send({ jwt });
  } catch (err) {
    return res.sendStatus(401);
  }
};

controller.listAuthUser = async (req, res) => {
  const { authorization } = req.headers;
  if (!authorization) return res.sendStatus(401);
  try {
    const encoder = new TextEncoder();
    const { payload } = await jwtVerify(
      authorization,
      encoder.encode(process.env.JWT_SECRET)
    );
    const user = USERS_BBDD.find((user) => user.guid === payload.guid);
    if (!user) return res.sendStatus(401);
    delete user.password;
    return res.send(user);
  } catch (err) {
    return res.sendStatus(401);
  }
};

module.exports = controller;
