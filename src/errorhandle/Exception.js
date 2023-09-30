import * as logger from "../helpers/logger.js";

export default class Exception extends Error {
  static MONGODB_CONNECT_ERROR = "MongoDB connect error...";
  static USER_ALREADY_EXIST = "User already exists";
  static USER_REGISTER_FAIL = "User register fail";
  static USER_GET_LIST = "User get list fail";
  static EMAIL_PASSWORD_NOT_VALID = "Email or password is not valid";
  static SERVER_ERROR = "Server error";
  static REQUEST_NOT_VALID = "Request is not valid";
  static TOKEN_NOT_VALID = "Token is not valid";
  static TOKEN_EXPIRED = "Token is expired";
  static STUDENT_EXIST = "Student is existing";
  constructor(message) {
    super(message);
    logger.error(message);
  }
}
