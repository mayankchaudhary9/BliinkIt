import AddressModel from "../models/address.model.js";
import UserModel from "../models/user.models.js";

export const addAddressController = async (req, res) => {
  try {
    const userId = req.userId;
    const { address_line, city, state, pincode, country, mobile } = req.body;

    const createAddress = new AddressModel({
      address_line,
      city,
      state,
      country,
      pincode,
      mobile,
    });

    const saveAddress = await createAddress.save();

    const addUserAddressId = await UserModel.findByIdAndUpdate(userId, {
      $push: {
        address_details: saveAddress._id,
      },
    });

    return res.json({
      message: "Address Created Successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
