import { Response } from "express";
import IExtendedRequest from "../../../middleware/type";
import sequelize from "../../../database/connection";

class StudentController {
  static async getStudents(req: IExtendedRequest, res: Response) {
    const instituteNumber = req.user?.currentInstituteNumber;
    const students = await sequelize.query(
      `SELECT * FROM student_${instituteNumber}`
    );
    res.status(200).json({
      message: "Students fetched successfully",
      data: students,
    });
  }
}

export default StudentController;
