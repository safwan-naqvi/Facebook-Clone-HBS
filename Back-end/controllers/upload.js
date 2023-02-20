exports.uploadImages = async (req, res) => {
  try {
    res.json("Welcome to the upload images");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
