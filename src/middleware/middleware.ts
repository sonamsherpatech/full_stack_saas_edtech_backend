import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../database/models/user.model";
import IExtendedRequest from "./type";
// interface IResult {
//   id: string;
//   iat: number;
//   exp: number;
// }

class Middleware {
  static async isLoggedIn(
    req: IExtendedRequest,
    res: Response,
    next: NextFunction
  ) {
    // Check if login or not
    // token accept
    const token = req.headers.authorization;
    if (!token) {
      res.status(401).json({
        message: "Please Provide Token",
      });
      return;
    }
    // verify token
    jwt.verify(token, "thisissecret", async (error, result: any) => {
      if (error) {
        res.status(403).json({
          message: "Token invalid!!",
        });
      } else {
        // console.log(result, "result");
        // const userData= await User.findAll({
        //   where: {
        //     id: result.id
        //   }
        // })
        const userData = await User.findByPk(result.id, {
          attributes: ["id", "currentInstituteNumber"],
        });
        if (!userData) {
          res.status(403).json({
            message: "No user with that id, invalid token",
          });
        } else {
          req.user = userData;
          next();
        }
      }
    });
  }

  // static restrictTo(req: Request, res: Response) {}
}

export default Middleware;
