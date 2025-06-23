import { NextFunction, Request, Response } from "express";
import sequelize from "../../database/connection";
import generateRandomInstituteNumber from "../../services/generaterandomnumber.service";
import IExtendedRequest from "../../middleware/type";
import User from "../../database/models/user.model";
import categories from "../../seed";

class InstituteController {
  static async createInstitute(
    req: IExtendedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const {
        instituteName,
        instituteEmail,
        institutePhoneNumber,
        instituteAddress,
      } = req.body;
      const instituteVatNo = req.body.instituteVatNo || null;
      const institutePanNo = req.body.institutePanNo || null;

      if (
        !instituteName ||
        !instituteEmail ||
        !institutePhoneNumber ||
        !instituteAddress
      ) {
        res.status(400).json({
          message:
            "Please provide instituteName, instituteEmail, institutePhoneNumber, instituteAddress",
        });
        return;
      }

      //aayo vane: institute create garnu paryo -> institute_12345, course_1234423

      const instituteNumber = generateRandomInstituteNumber();
      await sequelize.query(
        `CREATE TABLE IF NOT EXISTS institute_${instituteNumber}(
        id VARCHAR(36) PRIMARY KEY DEFAULT(UUID()),
        instituteName VARCHAR(255) NOT NULL,
        instituteEmail VARCHAR(255) NOT NULL UNIQUE,
        institutePhoneNumber VARCHAR(255) NOT NULL UNIQUE,
        instituteAddress VARCHAR(255) NOT NULL,
        institutePanNo VARCHAR(255),
        instituteVatNo VARCHAR(255),
        instituteLogo VARCHAR(255),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )`
      );

      await sequelize.query(
        `INSERT INTO institute_${instituteNumber} (instituteName, instituteEmail, institutePhoneNumber, instituteAddress, institutePanNo, instituteVatNo) VALUES (?,?,?,?,?,?)`,
        {
          replacements: [
            instituteName,
            instituteEmail,
            institutePhoneNumber,
            instituteAddress,
            institutePanNo,
            instituteVatNo,
          ],
        }
      );

      //to create user_institute history table jaha chain users le k k institute haru crate garyo sbaia ko number basnu paryo

      await sequelize.query(`CREATE TABLE IF NOT EXISTS user_institute(
        id VARCHAR(36) PRIMARY KEY DEFAULT(UUID()),
        userId VARCHAR(255) REFERENCES users(id),
        instituteNumber INT UNIQUE
      )`);

      if (req.user) {
        await sequelize.query(
          `INSERT INTO user_institute(userId,instituteNumber) VALUES(?,?)`,
          {
            replacements: [req.user.id, instituteNumber],
          }
        );

        // const user = await User.findByPk(req.user.id)
        // user?.currentInstituteNumber = instituteNumber
        // await user?.save();

        await User.update(
          {
            currentInstituteNumber: instituteNumber,
            role: "institute",
          },
          {
            where: {
              id: req.user.id,
            },
          }
        );
      }
      if (req.user) {
        req.user.currentInstituteNumber = instituteNumber;
      }
      // req.user?.instituteNumber = instituteNumber;
      next();
    } catch (error) {
      console.log(error);
    }
  }

  static async createTeacherTable(
    req: IExtendedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const instituteNumber = req.user?.currentInstituteNumber;
      await sequelize.query(`CREATE TABLE IF NOT EXISTS teacher_${instituteNumber}(
      id VARCHAR(36) PRIMARY KEY DEFAULT(UUID()),
      teacherName VARCHAR(255) NOT NULL,
      teacherEmail VARCHAR(255) NOT NULL UNIQUE,
      teacherPhoneNumber VARCHAR(255) NOT NULL UNIQUE,
      teacherExpertise VARCHAR(255),
      joinedDate Date,
      salary VARCHAR(100),
      teacherPhoto VARCHAR(255),
      teacherPassword VARCHAR(255), 
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )`);
      next();
    } catch (error) {
      console.log(error + "Error");
      res.status(500).json({
        message: error,
      });
    }
  }

  static async createStudentTable(
    req: IExtendedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const instituteNumber = req.user?.currentInstituteNumber;
      await sequelize.query(
        `CREATE TABLE IF NOT EXISTS student_${instituteNumber} (
        id VARCHAR(36) PRIMARY KEY DEFAULT(UUID()),
        studentName VARCHAR(255) NOT NULL,
        studentPhoneNo VARCHAR(255) NOT NULL UNIQUE,
        studentAddress TEXT,
        enrolledDate DATE,
        studentImage VARCHAR(255),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )`
      );
      next();
    } catch (error) {
      console.log(error + "Error");
      res.status(500).json({
        message: error,
      });
    }
  }

  static async createCourseTable(req: IExtendedRequest, res: Response) {
    const instituteNumber = req.user?.currentInstituteNumber;
    await sequelize.query(
      `CREATE TABLE IF NOT EXISTS course_${instituteNumber} (
        id VARCHAR(36) PRIMARY KEY DEFAULT(UUID()),
        courseName VARCHAR(255) NOT NULL UNIQUE,
        courseDescription TEXT NOT NULL,
        coursePrice VARCHAR(255)  NOT NULL,
        courseDuration VARCHAR(100) NOT NULL,
        courseLevel ENUM('beginner', 'intermediate', 'advance') NOT NULL,
        courseThumbnail VARCHAR(255),
        teacherId VARCHAR(36)  REFERENCES teacher_${instituteNumber} (id),
        categoryId VARCHAR(36) NOT NULL REFERENCES category_${instituteNumber} (id),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )`
    );
    res.status(200).json({
      message: "Institute Created!!",
      instituteNumber,
    });
  }

  static async createCategoryTable(
    req: IExtendedRequest,
    res: Response,
    next: NextFunction
  ) {
    const instituteNumber = req.user?.currentInstituteNumber;
    try {
      await sequelize.query(`CREATE TABLE IF NOT EXISTS category_${instituteNumber}(
          id VARCHAR(36) PRIMARY KEY DEFAULT(UUID()),
          categoryName VARCHAR(100) NOT NULL,
          categoryDescription TEXT,
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`);

      categories.forEach(async (category) => {
        await sequelize.query(
          `INSERT INTO category_${instituteNumber} (categoryName, categoryDescription) VALUES (?,?) `,
          {
            replacements: [category.categoryName, category.categoryDescription],
          }
        );
      });
      next();
    } catch (error) {
      console.log(error, "Error");
      res.status(500).json({
        message: error,
      });
    }
  }
}

export default InstituteController;
