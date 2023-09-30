import jwt from "jsonwebtoken";
import HttpStatusCode from "../errorhandle/HttpStatusCode.js";
import Exception from "../errorhandle/Exception.js";

export default function checkToken(req, res, next) {
  // bypass login, register
  if (req.url.includes("login") || req.url.includes("register")) {
    next();
    return;
  }
  const token = req.headers.authorization.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (payload.exp * 1000 < new Date().getTime()) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        message: Exception.TOKEN_EXPIRED,
      });
    } else {
      next();
    }
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      message: Exception.TOKEN_NOT_VALID,
    });
  }
}
