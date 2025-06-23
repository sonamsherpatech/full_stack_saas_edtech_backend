import { NextFunction, Request, Response } from "express";
import sequelize from "../../../database/connection";
import IExtendedRequest from "../../../middleware/type";
import { QueryTypes } from "sequelize";

class CourseController {
  static async createCourse(req: IExtendedRequest, res: Response) {
    const {
      courseName,
      courseDescription,
      coursePrice,
      courseDuration,
      courseLevel,
      categoryId,
    } = req.body;

    if (
      !courseName ||
      !courseDescription ||
      !coursePrice ||
      !courseDuration ||
      !courseLevel ||
      !categoryId
    ) {
      return res.status(400).json({
        message:
          "Please provide courseName, courseDescription, coursePrice, courseDuration, categoryId and courseLevel",
      });
    }
    // console.log(req.file, "File");
    const courseThumbnail = req.file ? req.file.path : null;
    // console.log(courseThumbnail, "Course Thumbnail");

    const instituteNumber = req.user?.currentInstituteNumber;
    const returnedData = await sequelize.query(
      `INSERT INTO course_${instituteNumber} (courseName, coursePrice, courseDescription, courseDuration, courseLevel,courseThumbnail, categoryId) VALUES (?,?,?,?,?,?,?)`,
      {
        type: QueryTypes.INSERT,
        replacements: [
          courseName,
          coursePrice,
          courseDescription,
          courseDuration,
          courseLevel,
          courseThumbnail,
          categoryId,
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
        type: QueryTypes.SELECT,
        replacements: [id],
      }
    ); //return array

    if (courseData.length === 0) {
      return res.status(404).json({
        message: "no course with that id",
      });
    }

    await sequelize.query(
      `DELETE FROM course_${instituteNumber} WHERE id = ?`,
      {
        type: QueryTypes.DELETE,
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
      `SELECT * FROM course_${instituteNumber} as course JOIN category_${instituteNumber} as category ON course.categoryId = category.id`,
      {
        type: QueryTypes.SELECT,
      }
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
        type: QueryTypes.SELECT,
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
