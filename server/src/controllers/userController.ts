import { Request, Response} from 'express'
import { UsersModel } from "../models/UsersModel";


// POST
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

// GET all users
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await UsersModel.find();
    res.status(200).json({ success: true, data: users });
  } catch (error: any) {
    res.status(500).json({ error: "Error: " + error.message });
  }
};

// GET user by ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await UsersModel.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ success: true, data: user });
  } catch (error: any) {
    res.status(500).json({ error: "Error: " + error.message });
  }
};

// UPDATE 
export const updateUser = async (req: Request, res: Response) => {
  try {
    const updatedUser = await UsersModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ success: true, data: updatedUser });
  } catch (error: any) {
    res.status(500).json({ error: "Error: " + error.message });
  }
};

// DELETE 
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const deletedUser = await UsersModel.findByIdAndDelete(req.params.id);

    if (!deletedUser) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: "Error: " + error.message });
  }
};