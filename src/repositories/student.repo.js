import Exception from "../errorhandle/Exception.js";
import Student from "../models/Student.model.js";
import { faker } from "@faker-js/faker";

const getStudentList = async ({ page, size, searchString }) => {
  const _page = parseInt(page);
  const _size = parseInt(size);
  const _searchString = searchString || '';
  try {
    const studentList = await Student.aggregate([
      {
        $match: {
          $or: [
            {
              name: { $regex: `.*${_searchString}.*` },
            },
            {
              email: { $regex: `.*${_searchString}.*` },
            },
            {
              mobilePhone: { $regex: `.*${_searchString}.*` },
            },
          ],
        },
      },
      { $skip: _page * _size },
      { $limit: _size },
    ]);
    return studentList;
  } catch (error) {
    throw new Exception(error.message);
  }
};

const getStudentById = async ({ id }) => {
  try {
    const foundStudent = await Student.findById(id);
    return foundStudent._doc;
  } catch (error) {
    throw new Exception(error.message);
  }
};

const createStudent = async ({
  name,
  email,
  languages,
  gender,
  mobilePhone,
}) => {
  try {
    const foundUser = await Student.findOne({ name });
    if (foundUser) {
      throw new Exception(Exception.STUDENT_EXIST);
    }
    const newStudent = await Student.create({
      name,
      email,
      languages,
      gender,
      mobilePhone,
    });
    return newStudent;
  } catch (error) {
    throw new Exception(error.message);
  }
};

const updateStudent = async ({
  id,
  name,
  email,
  languages,
  gender,
  mobilePhone,
}) => {
  const updateData = {};
  if (name) {
    updateData.name = name;
  }
  if (email) {
    updateData.email = email;
  }
  if (languages) {
    updateData.languages = languages;
  }
  if (gender) {
    updateData.gender = gender;
  }
  if (mobilePhone) {
    updateData.mobilePhone = mobilePhone;
  }
  try {
    await Student.findByIdAndUpdate(id, updateData);
    const updatedStudent = await Student.findById(id);
    return updatedStudent._doc;
  } catch (error) {
    throw new Exception(error.message);
  }
};

const deleteStudent = async ({ id }) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(id);
    return deletedStudent._doc;
  } catch (error) {
    throw new Exception(error.message);
  }
};

const fakeStudent = async () => {
  try {
    const fakeList = [];
    [...Array(100).keys()].forEach(async (_) => {
      const fakeStudent = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        languages: [
          faker.helpers.arrayElement(["English", "Japanese"]),
          faker.helpers.arrayElement(["French", "Germany"]),
        ],
        gender: faker.helpers.arrayElement(["Male", "Female"]),
        mobilePhone: faker.phone.number(),
      };
      fakeList.push(fakeStudent);
    });
    try {
      await Student.insertMany(fakeList);
    } catch (error) {
      throw new Exception(Exception.SERVER_ERROR);
    }
  } catch (error) {
    throw new Exception(Exception.SERVER_ERROR);
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
