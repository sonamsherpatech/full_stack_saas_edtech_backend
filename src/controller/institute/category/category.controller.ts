import { Response } from "express";
import IExtendedRequest from "../../../middleware/type";
import sequelize from "../../../database/connection";
import { QueryError, QueryTypes } from "sequelize";

class CategoryController {
  static async createCategory(req: IExtendedRequest, res: Response) {
    const instituteNumber = req.user?.currentInstituteNumber;
    const { categoryName, categoryDescription } = req.body;

    if (!categoryName || !categoryDescription) {
      res.status(400).json({
        message: "Please provide category name and description",
      });
      return;
    }

    await sequelize.query(
      `INSERT INTO category_${instituteNumber} (categoryName, categoryDescription) VALUES (?,?)`,
      {
        type: QueryTypes.INSERT,
        replacements: [categoryName, categoryDescription],
      }
    );
    res.status(200).json({
      message: "Category added successfully",
    });
  }

  static async getCategories(req: IExtendedRequest, res: Response) {
    const instituteNumber = req.user?.currentInstituteNumber;
    const categories = await sequelize.query(
      `SELECT * FROM category_${instituteNumber}`,
      {
        type: QueryTypes.SELECT,
        //k operation gareko ho tyo xai type ma dinu paryo
      }
    );

    if (!categories) {
      res.status(400).json({
        message: "No Category Found",
      });
      return;
    }

    res.status(200).json({
      message: "Category fetched successfully",
      data: categories,
    });
  }

  static async deleteCategory(req: IExtendedRequest, res: Response) {
    const instituteNumber = req.user?.currentInstituteNumber;
    const categoryId = req.params.id;

    await sequelize.query(
      `DELETE FROM category_${instituteNumber} WHERE id =?`,
      {
        type: QueryTypes.DELETE,
        replacements: [categoryId],
      }
    );

    res.status(200).json({
      message: "Category Deleted Successfully",
    });
  }
}

export default CategoryController;
