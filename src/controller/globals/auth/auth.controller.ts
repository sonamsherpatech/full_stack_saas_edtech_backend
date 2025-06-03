//logical code

/**
 * REGISTER/SIGNUP
 * -> Incoming data -->  username, email, password
 * -> processing/checking --> email, valid, compulsory data aaunu paryo
 * -> db --> table query --> table ma insert/read/delete/update
 *
 * LOGIN/SIGNIN
 * LOGOUT
 * FORGOT PASSWORD
 * RESET PASSWORD/ OTP
 */

import { Request, Response } from "express";
import User from "../../../database/models/user.model";
import bcrypt from "bcrypt";

// json data --> req.body //username, email, password
// files --> req.file //files

// const registerUser = async (req: Request, res: Response) => {
//   //accepting incoming data
//   const { username, password, email } = req.body;
//   if (!username || !email || !password) {
//     return res.status(400).json({
//       message: "Please provide username, password, email",
//     });
//   }
//   // insert into Users table
//   await User.create({
//     username,
//     password,
//     email,
//   });
//   res.status(200).json({
//     message: "User registered sucessfully",
//   });
// };

class AuthController {
  static async registerUser(req: Request, res: Response) {
    if (req.body === undefined) {
      console.log("triggered");
      res.status(400).json({
        message: "No data was sent!!",
      });
      return;
    }

    const { username, password, email } = req.body;

    if (!username || !email || !password) {
      res.status(400).json({
        message: "Please provide username, password, email",
      });
      return;
    }
    // insert into Users table
    await User.create({
      username,
      password: bcrypt.hashSync(password, 12),
      email,
    });
    res.status(201).json({
      message: "User registered sucessfully",
    });
  }
}

export default AuthController;
// export {registerUser};
