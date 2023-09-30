import Exception from "../errorhandle/Exception.js";
import { User } from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const login = async ({ email, password }) => {
  try {
    const existUser = await User.where({ email }).findOne().exec();
    if (!!existUser) {
      // gen Json Web Token
      const isPasswordValid = bcrypt.compareSync(password, existUser.password);
      if (isPasswordValid) {
        const token = jwt.sign(
          { email: existUser.email, name: existUser.name },
          process.env.JWT_SECRET,
          { expiresIn: "1 days" }
        );
        return {
          user: {
            id: existUser._id._id,
            name: existUser.name,
            email: existUser.email,
          },
          token: token,
        };
      } else {
        throw new Exception(Exception.EMAIL_PASSWORD_NOT_VALID);
      }
    } else {
      throw new Exception(Exception.EMAIL_PASSWORD_NOT_VALID);
    }
  } catch (error) {
    throw new Exception(error.message);
  }
};

const register = async ({ email, password, name, phone, address }) => {
  const existingUser = await User.findOne({ email }).exec();
  if (!!existingUser) {
    throw new Exception(Exception.USER_ALREADY_EXIST);
  }
  try {
    const hash = bcrypt.hashSync(
      password,
      bcrypt.genSaltSync(parseInt(process.env.SALT_ROUNDS))
    );
    const newUser = await User.create({
      name,
      email,
      password: hash,
      phone,
      address,
    });
    return newUser;
  } catch (error) {
    throw new Exception(Exception.USER_REGISTER_FAIL);
  }
};

const getUserList = async () => {
  try {
    return await User.find().exec();
  } catch (error) {
    throw new Exception(error.message);
  }
};

export default { login, register, getUserList };
