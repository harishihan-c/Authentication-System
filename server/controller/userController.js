import userModel from "../model/userModel";

export const userData = async (req, res) => {
  const { userID } = req.body;

  try {
    const user = await userModel.findById({ userID });

    if (!user) {
      return res.json({ success: false, message: "User not Found" });
    }

    return res.json({
      success: true,
      message: "User not Found",
      data: {
        name: user.name,
        isAccountVerified: user.isAccountVerified,
      },
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
