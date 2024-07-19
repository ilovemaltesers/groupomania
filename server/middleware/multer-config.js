const multer = require("multer");
const path = require("path");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, "..", "images")); // Adjust path as needed
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_"); // Replace spaces with underscores
    const extension = MIME_TYPES[file.mimetype]; // Get file extension from MIME_TYPES
    callback(null, name + "_" + Date.now() + "." + extension); // Concatenate filename with timestamp and extension
  },
});

module.exports = multer({ storage: storage }).single("image");
