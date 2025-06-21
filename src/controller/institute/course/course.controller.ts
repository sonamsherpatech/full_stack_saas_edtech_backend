import { NextFunction, Request, Response } from "express";
import sequelize from "../../../database/connection";
import IExtendedRequest from "../../../middleware/type";

class CourseController {
  static async createCourse(req: IExtendedRequest, res: Response) {
    const {
      courseName,
      courseDescription,
      coursePrice,
      courseDuration,
      courseLevel,
    } = req.body;

    if (
      !courseName ||
      !courseDescription ||
      !coursePrice ||
      !courseDuration ||
      !courseLevel
    ) {
      return res.status(400).json({
        message:
          "Please provide courseName, courseDescription, coursePrice, courseDuration and courseLevel",
      });
    }
    // console.log(req.file, "File");
    const courseThumbnail = req.file ? req.file.path : null;
    // console.log(courseThumbnail, "Course Thumbnail");

    const instituteNumber = req.user?.currentInstituteNumber;
    const returnedData = await sequelize.query(
      `INSERT INTO course_${instituteNumber} (courseName, coursePrice, courseDescription, courseDuration, courseLevel,courseThumbnail) VALUES (?,?,?,?,?,?)`,
      {
        replacements: [
          courseName,
          coursePrice,
          courseDescription,
          courseDuration,
          courseLevel,
          courseThumbnail,
        ],
      }
    );
    console.log(returnedData);
    res.status(200).json({
      message: "Course Created Successfully",
    });
  }

  static async deleteCourse(req: IExtendedRequest, res: Response) {
    const instituteNumber = req.user?.currentInstituteNumber;
    const id = req.params.id;

    const courseData = await sequelize.query(
      `SELECT * FROM course_${instituteNumber} WHERE id = ?`,
      {
        replacements: [id],
      }
    ); //return array

    if (courseData[0].length === 0) {
      return res.status(404).json({
        message: "no course with that id",
      });
    }

    await sequelize.query(
      `DELETE FROM course_${instituteNumber} WHERE id = ?`,
      {
        replacements: [id],
      }
    );
    res.status(200).json({
      message: "Course deleted successfully",
    });
  }

  static async getAllCourses(req: IExtendedRequest, res: Response) {
    const instituteNumber = req.user?.currentInstituteNumber;
    const courses = await sequelize.query(
      `SELECT * FROM course_${instituteNumber}`
    );
    res.status(200).json({
      message: "Courses fetched",
      data: courses || [],
    });
  }

  static async getSingleCourse(req: IExtendedRequest, res: Response) {
    const instituteNumber = req.user?.currentInstituteNumber;
    const courseId = req.params.id;
    const course = await sequelize.query(
      `SELECT * FROM course_${instituteNumber} WHERE id = ?`,
      {
        replacements: [courseId],
      }
    );
    res.status(200).json({
      message: "Single Course fetched",
      data: course,
    });
  }
}

export default CourseController;
