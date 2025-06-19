// multer configuration

import { Request } from "express";
import multer from "multer";

const storage = multer.diskStorage({
  //location incoming file kata rakne bhanne ho
  //cb -> callback
  //cb(error, success)
  destination: function (req: Request, file: Express.Multer.File, cb: any) {
    cb(null, "./src/storage");
  },

  // mathi ko location deko ma rakey paxi, k name ma rakne vanne
  filename: function (req: Request, file: Express.Multer.File, cb: any) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export { multer, storage };

/**
 * flow
 * hello.pdf --> multer --> location(storate) --> filename (hellofdfsa.pdf)
 */
