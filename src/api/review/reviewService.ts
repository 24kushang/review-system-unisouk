import { StatusCodes } from "http-status-codes";

import type { User } from "@/api/user/userModel";
import { UserRepository } from "@/api/user/userRepository";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { logger } from "@/server";
import { orders, ReviewRepository } from "./reviewRepository";
import { Review } from "./reviewModel";

export class ReviewService {
  private reviewRepository: ReviewRepository;

  constructor(repository: ReviewRepository = new ReviewRepository()) {
    this.reviewRepository = repository;
  }

  // Retrieves all users from the database
  async findAll(): Promise<ServiceResponse<Review[] | null>> {
    try {
      const reviews = await this.reviewRepository.findAllAsync();
      if (!reviews || reviews.length === 0) {
        return ServiceResponse.failure(
          "No Users found",
          null,
          StatusCodes.NOT_FOUND
        );
      }
      return ServiceResponse.success<Review[]>("Users found", reviews);
    } catch (ex) {
      const errorMessage = `Error finding all users: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while retrieving users.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Retrieves a single user by their ID
  // async findById(id: number): Promise<ServiceResponse<User | null>> {
  //   try {
  //     const user = await this.userRepository.findByIdAsync(id);
  //     if (!user) {
  //       return ServiceResponse.failure(
  //         "User not found",
  //         null,
  //         StatusCodes.NOT_FOUND
  //       );
  //     }
  //     return ServiceResponse.success<User>("User found", user);
  //   } catch (ex) {
  //     const errorMessage = `Error finding user with id ${id}:, ${
  //       (ex as Error).message
  //     }`;
  //     logger.error(errorMessage);
  //     return ServiceResponse.failure(
  //       "An error occurred while finding user.",
  //       null,
  //       StatusCodes.INTERNAL_SERVER_ERROR
  //     );
  //   }
  // }
  async createReview(reviewObject: Review) {
    let certified = false;
    const userOrder = orders.filter(
      (order) => reviewObject.userId === order.userId
    );
    if (userOrder.length > 0) {
      const productOrdered = userOrder[0].productId.filter(
        (e) => reviewObject.productId === e
      );
      certified = productOrdered.length > 0 ? true : false;
    } else {
      certified = false;
    }

    reviewObject.certified = certified;
    const createdReview = await this.reviewRepository.create(reviewObject);
    return ServiceResponse.success<Review>("Users found", createdReview);
  }
  async findAllByProductId(productId: string) {
    const reviews = await this.reviewRepository.findAllByProductId(productId);
    return ServiceResponse.success<Review[]>("Users found", reviews);
  }
}

export const reviewService = new ReviewService();
