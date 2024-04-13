import HttpError from "../helpers/HttpError.js";
import {
  findUser,
  registerUser,
  updateUser,
} from "../services/authServices.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";

configDotenv();

const { JWT_SECRET } = process.env;

export const fetchRegisterUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existingUser = await findUser({ email });
    if (existingUser) {
      throw HttpError(409, "Email is already in use");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await registerUser({ ...req.body, password: hashPassword });
    const responseBody = {
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    };
    res.status(201).json(responseBody);
  } catch (error) {
    next(error);
  }
};

export const fetchLoginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await findUser({ email });
    if (!user) {
      throw HttpError(401, "Email or password is wrong");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw HttpError(401, "Email or password is wrong");
    }
    const { _id: id } = user;
    const payload = {
      id,
    };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
    await updateUser({ _id: id }, { token });

    const responseBody = {
      token: token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    };

    res.status(200).json(responseBody);
  } catch (error) {
    next(error);
  }
};

export const fetchCurrentUser = async (req, res) => {
  const { email, subscription } = req.user;
  res.status(200, "OK").json({ email, subscription });
};

export const fetchLogoutUser = async (req, res) => {
  const { _id } = req.user;
  await updateUser({ _id }, { token: "" });
  res.status(204).json({ message: "No Content" });
};

export const fetchUpdateSubUser = async (req, res) => {
  const { _id, email } = req.user;
  const { subscription } = req.body;
  await updateUser({ _id }, { subscription: subscription });
  res
    .status(201)
    .json({ message: `User ${email} subscription changed to ${subscription}` });
};
