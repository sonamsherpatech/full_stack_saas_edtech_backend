import { Response } from "express";
import IExtendedRequest from "../../../middleware/type";

class CategoryController {
  static async createCategory(req: IExtendedRequest, res: Response) {
    const instituteNumber = req.user?.currentInstituteNumber;
    const { categoryName, categoryDescription } = req.body;

    if (!categoryName || !categoryDescription) {
      res.status(400).json({
        message: "Please provide category name and description",
      });
    }
  }
}
