import express, { type Router } from "express";

import { GetUserSchema, UserSchema } from "@/api/user/userModel";
import { validateRequest } from "@/common/utils/httpHandlers";
import { userController } from "../user/userController";
import { reviewController } from "./reviewController";

export const reviewRouter: Router = express.Router();

reviewRouter.get("/", reviewController.getReviews);
reviewRouter.get("/:productId", reviewController.getProductReviews);
reviewRouter.post("/", reviewController.createReviews);
