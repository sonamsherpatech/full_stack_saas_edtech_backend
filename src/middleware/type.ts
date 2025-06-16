import { Request } from "express";

interface IExtendedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
    username: string | null;
  };
  instituteNumber?: number | string;
}

export default IExtendedRequest;
