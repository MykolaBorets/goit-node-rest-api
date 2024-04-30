import express from "express";
import {
  fetchRegisterUser,
  fetchUserVerify,
  fetchResendVerify,
  fetchLoginUser,
  fetchCurrentUser,
  fetchLogoutUser,
  fetchUpdateSubUser,
  fetchUpdateUserAvatar,
} from "../controllers/authContollers.js";
import {
  userSignInSchema,
  usersSignUpSchema,
  userUpdateSub,
  userEmailSchema,
} from "../schemas/usersSchemas.js";
import { validateBody, validateBodyResendEmail } from "../helpers/validateBody.js";
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";

const authRouter = express.Router();
authRouter.post(
  "/register",
  validateBody(usersSignUpSchema),
  fetchRegisterUser
);
authRouter.get("/verify/:verificationToken", fetchUserVerify);
authRouter.post(
  "/verify",
  validateBodyResendEmail(userEmailSchema),
  fetchResendVerify
);
authRouter.post("/login", validateBody(userSignInSchema), fetchLoginUser);
authRouter.get("/current", authenticate, fetchCurrentUser);
authRouter.post("/logout", authenticate, fetchLogoutUser);
authRouter.patch(
  "/",
  authenticate,
  validateBody(userUpdateSub),
  fetchUpdateSubUser
);
authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  fetchUpdateUserAvatar
);

export default authRouter;
