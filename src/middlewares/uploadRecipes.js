const multer = require("multer");

// manajemen file
const multerUpload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    const fileSize = parseInt(req.headers["content-length"]);
    const maxSize = 2 * 1024 * 1024;
    if (fileSize > maxSize) {
      const error = {
        message: "File size exceeds 2 MB",
      };
      return cb(error, false);
    }
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg"
    ) {
      cb(null, true);
    } else {
      const error = {
        message: "file must be jpeg,jpg or png",
      };
      cb(error, false);
    }
  },
});

// middleware
const uploadRecipes = (req, res, next) => {
  const multerSingle = multerUpload.single("recipe_thumbnail");
  multerSingle(req, res, (error) => {
    if (!error) {
      next();
    } else {
      res.status(500).json({ message: error.message });
    }
  });
};

module.exports = uploadRecipes;
