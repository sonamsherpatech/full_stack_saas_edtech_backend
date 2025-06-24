import { Response } from "express";
import IExtendedRequest from "../../../middleware/type";
import sequelize from "../../../database/connection";
import { QueryTypes } from "sequelize";
import generateRandomPassword from "../../../services/generaterandompassword.service";
import sendMail from "../../../services/sendmail.service";
import { subscribe } from "diagnostics_channel";

class TeacherController {
  static async createTeacher(req: IExtendedRequest, res: Response) {
    //teacher k k data chainxa tyo accept garum
    const insititueNumber = req.user?.currentInstituteNumber;
    const {
      teacherName,
      teacherEmail,
      teacherPhoneNumber,
      teacherExpertise,
      teacherJoinedDate,
      teacherSalary,
      courseId,
    } = req.body;

    const teacherPhoto = req.file
      ? req.file.path
      : "https://static.vecteezy.com/system/resources/thumbnails/001/840/618/small/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg";

    if (
      !teacherName ||
      !teacherEmail ||
      !teacherPhoneNumber ||
      !teacherExpertise ||
      !teacherJoinedDate ||
      !teacherSalary
    ) {
      return res.status(400).json({
        message:
          "Please provide teacherName, teacherEmail, teacherPhoneNumber, teacherExpertise, joinedDate, teacherSalary",
      });
    }

    //password generate function
    const data = generateRandomPassword(teacherName);

    const insertedData = await sequelize.query(
      `INSERT INTO teacher_${insititueNumber} (teacherName, teacherEmail, teacherPhoneNumber, teacherExpertise, joinedDate, salary, teacherPhoto,teacherPassword) VALUES(?,?,?,?,?,?,?,?)`,
      {
        type: QueryTypes.INSERT,
        replacements: [
          teacherName,
          teacherEmail,
          teacherPhoneNumber,
          teacherExpertise,
          teacherJoinedDate,
          teacherSalary,
          teacherPhoto,
          data.hashedVersion,
        ],
      }
    );

    const teacherData: { id: string }[] = await sequelize.query(
      `SELECT id FROM teacher_${insititueNumber} WHERE teacherEmail = ?`,
      {
        type: QueryTypes.SELECT,
        replacements: [teacherEmail],
      }
    );
    // console.log(teacherData);

    await sequelize.query(
      `UPDATE course_${insititueNumber} SET teacherId = ? WHERE id = ?`,
      {
        type: QueryTypes.UPDATE,
        replacements: [teacherData[0].id, courseId],
      }
    );

    //send mail function goes here
    const mailInformation = {
      to: teacherEmail,
      subject: "Welcome to Digital Pathshala",
      html: `<h1 style='text-align:center'>Hey!! We are exicted to appoint you to a NodeJS course</h1>
       <p>This your email and password</p>
       <p>Email: <span style="font-size:28px, font-weight:700">${teacherEmail}></span></p>
       <p>Password: <span style="font-size:28px, font-weight:700">${data.plainVersion}</span></p>`,
    };
    await sendMail(mailInformation);

    res.status(200).json({
      message: "teacher created",
    });
  }

  static async getTeachers(req: IExtendedRequest, res: Response) {
    const instituteNumber = req.user?.currentInstituteNumber;
    const teachers = await sequelize.query(
      `SELECT * FROM teacher_${instituteNumber}`,
      {
        type: QueryTypes.SELECT,
      }
    );

    res.status(200).json({
      message: "Teacher Fetched Successfully",
      data: teachers,
    });
  }

  static async deleteTeacher(req: IExtendedRequest, res: Response) {
    const insititueNumber = req.user?.currentInstituteNumber;
    const id = req.params.id;
    await sequelize.query(
      `DELETE FROM teacher_${insititueNumber} WHERE id = ?`,
      {
        type: QueryTypes.DELETE,
        replacements: [id],
      }
    );

    res.status(200).json({
      message: "Teacher Deleted Successfully",
    });
  }
}

export default TeacherController;
