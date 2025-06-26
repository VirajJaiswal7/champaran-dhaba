import jwt from "jsonwebtoken";

export const adminAuth = async (req, res, next) => {
  try {
    const token =
      req.cookies.adminToken || req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
      return res.status(400).json({
        message: "token not exist logged in again",
        success: false,
      });
    }


    const decode = await jwt.verify(token, process.env.ADMIN_JWT_SECRET_KEY);
    if (!decode) {
      return res.status(400).json({
        message: "wrong token",
        success: false,
      });
    }

    if (process.env.ADMIN_EMAIL !== decode?.adminEmail) {
      return res.status(400).json({
        message: "You are not a vailid admin",
        success: false,
      });
    }
    req.email = decode.adminEmail;
    next();
  } catch (error) {
    console.log(error);
  }
};
