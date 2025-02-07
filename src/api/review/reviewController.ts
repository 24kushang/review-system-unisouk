import type { Request, RequestHandler, Response } from "express";

import { userService } from "@/api/user/userService";
import { handleServiceResponse } from "@/common/utils/httpHandlers";
import { reviewService } from "./reviewService";

class ReviewController {
  //   public getUsers: RequestHandler = async (_req: Request, res: Response) => {
  //     const serviceResponse = await userService.findAll();
  //     return handleServiceResponse(serviceResponse, res);
  //   };

  //   public getUser: RequestHandler = async (req: Request, res: Response) => {
  //     const id = Number.parseInt(req.params.id as string, 10);
  //     const serviceResponse = await userService.findById(id);
  //     return handleServiceResponse(serviceResponse, res);
  //   };
  public getReviews: RequestHandler = async (_req: Request, res: Response) => {
    const serviceResponse = await reviewService.findAll();
    return handleServiceResponse(serviceResponse, res);
  };
  public getProductReviews: RequestHandler = async (
    _req: Request,
    res: Response
  ) => {
    const id = _req.params.productId;

    console.log(id);
    const serviceResponse = await reviewService.findAllByProductId(id);
    return handleServiceResponse(serviceResponse, res);
  };
  public createReviews: RequestHandler = async (
    _req: Request,
    res: Response
  ) => {
    console.log(_req.body);
    const serviceResponse = await reviewService.createReview(_req.body);
    return handleServiceResponse(serviceResponse, res);
  };
}

export const reviewController = new ReviewController();
