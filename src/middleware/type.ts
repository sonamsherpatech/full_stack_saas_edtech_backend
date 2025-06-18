import { Request } from "express";

interface IExtendedRequest extends Request {
  user?: {
    id: string;
    currentInstituteNumber: string | number;
  };
}

export default IExtendedRequest;
