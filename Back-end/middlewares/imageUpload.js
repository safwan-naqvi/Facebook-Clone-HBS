module.exports = async function (req, res, next) {
  try {
    //Lec82
    if (!req.files || Object.values(req.files).flat().length === 0) {
      return res.status(404).json({ message: "No Files Selected" });
    }
    let files = Object.values(req.files).flat();
    files.forEach((file) => {
      if (
        file.mimetype !== "image/jpeg" &&
        file.mimetype !== "image/png" &&
        file.mimetype !== "image/gif" &&
        file.mimetype !== "image/webp" &&
        file.mimetype !== "image/jpg"
      ) {
        return res.status(400).json({ message: "Unsupported format." });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
