import express from "express";
import {
  fetchRegisterUser,
  fetchLoginUser,
  fetchCurrentUser,
  fetchLogoutUser,
  fetchUpdateSubUser,
} from "../controllers/authContollers.js";
import {
  userSignInSchema,
  usersSignUpSchema,
  userUpdateSub,
} from "../schemas/usersSchemas.js";
import validateBody from "../helpers/validateBody.js";
import authenticate from "../middlewares/authenticate.js";

const authRouter = express.Router();
authRouter.post(
  "/register",
  validateBody(usersSignUpSchema),
  fetchRegisterUser
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

export default authRouter;
