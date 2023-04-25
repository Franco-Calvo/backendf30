import User from "../../models/User.js";

async function accountExistsSignIn(req, res, next) {
  const user = await User.findOne({ email: req.body.email }); 
  if (user) {
    req.user = {
      id: user._id,
      email: user.email,
      password: user.password,
      is_admin: user.is_admin,
      is_online: user.is_online,
      is_alumno: user.is_alumno,
    };
    return next();
  }
  return res.status(400).json({
    succes: false,
    message: "¡Correo incorrecto!",
  });
}
export default accountExistsSignIn;
