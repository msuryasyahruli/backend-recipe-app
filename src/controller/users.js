const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authHelper = require("../helper/auth");
const commonHelper = require("../helper/common");
const cloudinary = require("../middlewares/cloudinary");
const createError = require("http-errors");

let {
  createUsers,
  updateUsers,
  updatePasswordUsers,
  deleteUsers,
  findID,
  findEmail,
} = require("../model/users");
const schema = require("./validationSchema");

const usersController = {
  // get profile
  profile: async (req, res) => {
    try {
      const email = req.payload.user_email;

      const {
        rows: [user],
      } = await findEmail(email);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      delete user.user_password;

      commonHelper.response(res, user, 200, "Get Profile Success");
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
  },

  // register
  registerUsers: async (req, res, next) => {
    try {
      const { error } = schema.userSchema.validate(req.body);
      if (error) {
        return next(createError(400, error.details[0].message));
      }

      const {
        user_name,
        user_email,
        user_phone,
        user_password,
        confirm_password,
      } = req.body;
      const { rowCount } = await findEmail(user_email);
      if (rowCount) {
        return next(createError(409, "Email Already Taken"));
      }

      if (user_password !== confirm_password) {
        return next(createError(400, "Passwords do not match"));
      }

      const user_id = uuidv4();
      const user_passwordHash = bcrypt.hashSync(user_password);

      const data = {
        user_id,
        user_email,
        user_password: user_passwordHash,
        user_name,
        user_phone,
      };

      await createUsers(data);

      commonHelper.response(res, {}, 201, "Register Successfully");
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
  },

  // login
  loginUsers: async (req, res, next) => {
    try {
      const { user_email, user_password } = req.body;
      const {
        rows: [user],
      } = await findEmail(user_email);
      if (!user) {
        return next(createError(401, "Email is incorrect"));
      }

      const isValidPassword = bcrypt.compareSync(
        user_password,
        user.user_password
      );
      if (!isValidPassword) {
        return next(createError(401, "Password is incorrect"));
      }

      delete user.user_password;

      const payload = { user_email: user.user_email };
      user.token_user = authHelper.generateToken(payload);
      user.refreshToken = authHelper.generateRefreshToken(payload);

      const data = { token: user.token_user, refreshToken: user.refreshToken };
      commonHelper.response(res, data, 200, "Login Successfully");
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
  },

  // update
  updateUsers: async (req, res, next) => {
    try {
      const { user_name, user_phone } = req.body;
      const user_id = String(req.params.id);

      const { rowCount } = await findID(user_id);
      if (!rowCount) {
        return next(createError(404, "User ID Not Found"));
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

      await updateUsers(data);

      commonHelper.response(res, data, 200, "Profile updated");
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
  },

  // update password
  updatePasswordUsers: async (req, res, next) => {
    try {
      const { error } = schema.passwordSchema.validate(req.body);
      if (error) {
        return next(createError(400, error.details[0].message));
      }

      const { user_password, confirm_password } = req.body;
      const user_id = String(req.params.id);
      const { rowCount } = await findID(user_id);
      if (!rowCount) {
        return next(createError(404, "User ID Not Found"));
      }
      if (user_password !== confirm_password) {
        return next(createError(400, "Passwords do not match"));
      }

      const user_passwordHash = bcrypt.hashSync(confirm_password);

      const data = {
        user_id,
        user_password: user_passwordHash,
      };

      await updatePasswordUsers(data);

      commonHelper.response(res, {}, 200, "Password updated");
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
  },

  // delete
  deleteUsers: async (req, res, next) => {
    try {
      const user_id = String(req.params.id);
      const { rowCount } = await findID(user_id);
      if (!rowCount) {
        return next(createError(404, "User ID Not Found"));
      }
      deleteUsers(user_id)
        .then((result) =>
          commonHelper.response(res, result.rows, 200, "Delete Users Success")
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error", error });
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
