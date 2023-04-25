import User from "../../models/User.js";
import Crypto from "crypto";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

const controller = {
  sign_up: async (req, res, next) => {
    req.body.is_online = false;
    req.body.is_admin = false;
    req.body.is_alumno = false;
    req.body.photo = "https://imgur.com/58MAYB1";
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
    req.body.email = req.body.email.toLowerCase();
    try {
      const user = await User.create(req.body);
      return res.status(201).json({
        succes: true,
        message: "Usuario registrado!",
      });
    } catch (error) {
      next(error);
    }
  },

  sign_in: async (req, res, next) => {
    try {
      let user = await User.findOneAndUpdate(
        { email: req.user.email.toLowerCase() },
        { is_online: true },
        { new: true }
      );
      user.password = null;
      const token = jsonwebtoken.sign({ id: user._id }, process.env.SECRET, {
        expiresIn: 60 * 60 * 24 * 7,
      });
      return res.status(200).json({
        succes: true,
        message: "Has iniciado sesión!",
        user,
        token,
      });
    } catch (error) {
      next(error);
    }
  },

  sign_out: async (req, res, next) => {
    const { email } = req.user;

    try {
      await User.findOneAndUpdate(
        { email },
        { is_online: false },
        { new: true }
      );
      return res.status(200).json({
        succes: true,
        message: "Usuario deslogueado!",
      });
    } catch (error) {
      next(error);
    }
  },
};

export default controller;
