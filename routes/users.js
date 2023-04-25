import express from "express";
import schema_signup from "../schemas/sign_up.js";
import schema_signin from "../schemas/sign_in.js";
import controller from "../controllers/auth/auth.js";
import accountExistsSignUp from "../middlewares/users/accountExistsSignUp.js";
import accountExistsSignIn from "../middlewares/users/accountExistsSignIn.js";
import passwordIsOk from "../middlewares/users/passwordIsOk.js";
import passport from "../middlewares/passport.js";
import validator from "../middlewares/validator.js";

const { sign_up, sign_in, sign_out } = controller;

let router = express.Router();

router.post("/signup", validator(schema_signup), accountExistsSignUp, sign_up);
router.post(
  "/signin",
  validator(schema_signin),
  accountExistsSignIn,
  passwordIsOk,
  sign_in
);
router.post(
  "/signout",
  passport.authenticate("jwt", { session: false }),
  sign_out
);

export default router;
