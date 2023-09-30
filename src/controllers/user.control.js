import { userRepository } from "../repositories/index.js";
import HttpStatusCode from "../errorhandle/HttpStatusCode.js";

const register = async (req, res) => {
  try {
    const newUser = await userRepository.register(req.body);
    const { name, email } = newUser;
    return res.status(HttpStatusCode.OK).json({
      message: "User register success",
      data: { user: { id: newUser._id._id, name, email } },
    });
  } catch (exception) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({
      message: exception.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const loginData = await userRepository.login(req.body);
    return res.status(HttpStatusCode.OK).json({
      message: "Login success",
      data: loginData,
    });
  } catch (exception) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({
      message: exception.message,
    });
  }
};

export default {
  login,
  register,
};
