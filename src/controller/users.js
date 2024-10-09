const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const authHelper = require("../helper/auth");
const commonHelper = require("../helper/common");
const cloudinary = require("../middlewares/cloudinary");
let {
  createUsers,
  updateUsers,
  updatePasswordUsers,
  deleteUsers,
  findID,
  findEmail,
  countData,
} = require("../model/users");

let usersController = {
  // get profile
  profile: async (req, res) => {
    const email = req.payload.user_email;
    const {
      rows: [user],
    } = await findEmail(email);
    delete user.user_password;
    commonHelper.response(res, user, 201, "Get Profile");
  },

  // register
  registerUsers: async (req, res) => {
    const {
      user_name,
      user_email,
      user_phone,
      user_password,
      confirm_password,
    } = req.body;
    const { rowCount } = await findEmail(user_email);
    if (rowCount) {
      return res.json({ message: "Email Already Taken" });
    }
    const user_id = uuidv4();
    const schema = Joi.object().keys({
      user_email: Joi.required(),
      user_name: Joi.string().required(),
      user_phone: Joi.string().min(8).max(14),
      user_password: Joi.string().min(4).max(15).required(),
      confirm_password: Joi.ref("user_password"),
      user_photo: Joi.string().allow(""),
    });
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      console.log(error);
      return res.send(error.details[0].message);
    }
    const user_passwordHash = bcrypt.hashSync(confirm_password);
    const data = {
      user_id,
      user_email,
      user_passwordHash,
      user_name,
      user_phone,
    };
    createUsers(data)
      .then((result) =>
        commonHelper.response(res, result.rows, 201, "Create User Success")
      )
      .catch((err) => res.send(err));
  },

  // login
  loginUsers: async (req, res) => {
    const { user_email, user_password } = req.body;
    const {
      rows: [user],
    } = await findEmail(user_email);
    if (!user) {
      return res.json({ message: "Email Wrong" });
    }
    const isValidPassword = bcrypt.compareSync(
      user_password,
      user.user_password
    );
    if (!isValidPassword) {
      return res.json({ message: "Password Wrong" });
    }
    delete user.user_password;
    const payload = {
      user_email: user.user_email,
    };
    user.token_user = authHelper.generateToken(payload);
    user.refreshToken = authHelper.generateRefreshToken(payload);
    commonHelper.response(res, user, 201, "Login Successfully");
  },

  // update
  updateUsers: async (req, res) => {
    try {
      const { user_name, user_phone } = req.body;
      const user_id = String(req.params.id);
      const { rowCount } = await findID(user_id);
      if (!rowCount) {
        res.json({ message: "ID Not Found" });
      }
      const schema = Joi.object().keys({
        user_name: Joi.string().max(20),
        user_phone: Joi.string().min(10).max(15),
        user_photo: Joi.any(),
      });
      const { error, value } = schema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        console.log(error);
        return res.send(error.details[0].message);
      }
      let user_photo = null;
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        user_photo = result.secure_url;
      }
      const data = {
        user_id,
        user_name,
        user_phone,
        user_photo,
      };

      updateUsers(data)
        .then((result) =>
          commonHelper.response(res, result.rows, 200, "Update Users Success")
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },

  // update password
  updatePasswordUsers: async (req, res) => {
    try {
      const { user_password, confirm_password } = req.body;
      const user_id = String(req.params.id);
      const { rowCount } = await findID(user_id);
      if (!rowCount) {
        res.json({ message: "ID Not Found" });
      }
      const schema = Joi.object().keys({
        user_password: Joi.string().min(4).max(15),
        confirm_password: Joi.ref("user_password"),
      });
      const { error, value } = schema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        console.log(error);
        return res.send(error.details[0].message);
      }
      const user_passwordHash = bcrypt.hashSync(confirm_password);
      const data = {
        user_id,
        user_passwordHash,
      };
      updatePasswordUsers(data)
        .then((result) =>
          commonHelper.response(res, result.rows, 200, "Update Password Success")
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },

  // delete
  deleteUsers: async (req, res) => {
    try {
      const user_id = String(req.params.id);
      const { rowCount } = await findID(user_id);
      if (!rowCount) {
        res.json({ message: "ID Not Found" });
      }
      deleteUsers(user_id)
        .then((result) =>
          commonHelper.response(res, result.rows, 200, "Delete Users Success")
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },

  // token
  refreshToken: (req, res) => {
    const refreshToken = req.body.refreshToken;
    const decoded = jwt.verify(refreshToken, process.env.SECRETE_KEY_JWT);
    const payload = {
      users_email: decoded.users_email,
    };
    const result = {
      token_user: authHelper.generateToken(payload),
      refreshToken: authHelper.generateRefreshToken(payload),
    };
    commonHelper.response(res, result, 200);
  },
};

module.exports = usersController;
