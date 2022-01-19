import { Request } from "express";
import {IRegisterUser} from "./register.interface";

interface RequestWithUser extends Request {
  user: IRegisterUser;
  cookies: any;
  browserInfo: any;
}

export default RequestWithUser;