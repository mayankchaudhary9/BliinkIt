import SubCategoryModel from "../models/subCategory.model.js";

export const AddSubCategoryController = (req, res) => {
  try {
    const { name, image, category } = req.body;
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      succes: false,
    });
  }
};
