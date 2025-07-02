import { Request, Response} from 'express'
import { UsersModel } from "../models/UsersModel";

export const createUser = async (req:Request, res: Response) => {
  try {
    const { body } = req;
    const addedUsers = await UsersModel.create(
       body
    );

    if (!addedUsers) throw "couldn't add users";

    res.status(201).json({ success: true, data: addedUsers });
  } catch (error: any) {
    res.status(500).json({ error: "Error" + error.message });
  }
}

