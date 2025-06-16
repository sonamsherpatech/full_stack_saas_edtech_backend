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
import jwt from "jsonwebtoken";

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

/**
 * LOGIN FLOW
 * email/username, password (basic)
 * -> email, pasword/ username, password (select which method)
 * -> accept email/username and password data
 * -> Validation  (checking the correct format for email and password) if needed
 * -> First check email exist or not (verification)
 * -> if yes, then check password now
 * -> else, not registered
 * -> if password is also correct
 * -> token generation (through jsonwebtoken JWT package -> identity of the entity on respective website -> is in encrypted format -> which can be decrypted)
 *
 *
 *
 *
 * google login, fb, github (oauth),
 * email login(SSO)
 */

class AuthController {
  static async registerUser(req: Request, res: Response) {
    if (req.body === undefined) {
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
      password: bcrypt.hashSync(password, 12), //bycrypt uses blowfish algo bts -> increase in slat imporves security but decrease UX
      email,
    });
    res.status(201).json({
      message: "User registered sucessfully",
    });
  }

  static async loginUser(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        message: "Please provide email, password",
      });
      return;
    }

    // check if email exist or not inout user table
    const data = await User.findAll({
      where: {
        email,
      },
    });

    if (data.length == 0) {
      res.status(404).json({
        message: "Not registered!!",
      });
    } else {
      // check password
      const isPaswordMatch = bcrypt.compareSync(password, data[0].password);
      if (isPaswordMatch) {
        //login vayo, token generation
        const token = jwt.sign({ id: data[0].id }, "thisissecret", {
          expiresIn: "30d",
        });

        res.json({
          token,
          message: "Logged in Success",
        });
      } else {
        res.status(403).json({
          message: "Invalid email or password",
        });
      }
    }
  }
}

export default AuthController;
// export {registerUser};
