import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.json({
      success: false,
      message: "Not authorized Login again token not found",
    });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (!req.body) req.body = {};

    if (tokenDecode.id) {
      req.body.userID = tokenDecode.id;
    } else {
      return res.json({
        success: false,
        message: "Not authorized Login again token not verified",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Not authorized Login again",
      error: error.message,
    });
  }
};

export default userAuth;
