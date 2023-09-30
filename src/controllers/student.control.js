import Exception from "../errorhandle/Exception.js";
import HttpStatusCode from "../errorhandle/HttpStatusCode.js";
import { studentRepository } from "../repositories/index.js";

const getStudentList = async (req, res) => {
  try {
    const studentList = await studentRepository.getStudentList(req.query);
    const filterStudentList = studentList.map((_student) => {
      const { name, email, languages, gender, mobilePhone } = _student;
      return {
        name,
        email,
        languages,
        gender,
        mobilePhone,
        id: _student._id._id,
      };
    });
    return res.status(HttpStatusCode.OK).json({
      data: { count: filterStudentList.length, users: filterStudentList },
    });
  } catch (exception) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.message,
    });
  }
};

const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        message: Exception.REQUEST_NOT_VALID,
      });
    }
    const foundStudent = await studentRepository.getStudentById({ id });
    return res
      .status(HttpStatusCode.OK)
      .json({ message: "student get by id", data: { student: foundStudent } });
  } catch (exception) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.message,
    });
  }
};

const createStudent = async (req, res) => {
  try {
    const student = await studentRepository.createStudent(req.body);
    const { name, email, languages, gender, mobilePhone } = student;
    return res.status(HttpStatusCode.OK).json({
      data: {
        name,
        email,
        languages,
        gender,
        mobilePhone,
        id: student._id._id,
      },
    });
  } catch (exception) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.message,
    });
  }
};

const updateStudent = async (req, res) => {
  try {
    const updatedStudet = await studentRepository.updateStudent(req.body);
    return res.status(HttpStatusCode.OK).json({
      message: "student update success",
      data: { student: updatedStudet },
    });
  } catch (exception) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.message,
    });
  }
};

const deleteStudent = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({
      message: Exception.REQUEST_NOT_VALID,
    });
  }
  try {
    const deletedStudent = await studentRepository.deleteStudent({ id });
    return res
      .status(HttpStatusCode.OK)
      .json({ message: "student delete", data: { student: deletedStudent } });
  } catch (error) {}
};

const fakeStudent = async (req, res) => {
  try {
    await studentRepository.fakeStudent();
    return res.status(HttpStatusCode.OK).json({
      message: "Fake student success",
    });
  } catch (exception) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.message,
    });
  }
};

export default {
  getStudentList,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  fakeStudent,
};
