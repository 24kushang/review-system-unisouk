import type { User } from "@/api/user/userModel";
import { Review } from "./reviewModel";

export const reviews: Review[] = [
  {
    id: 1,
    text: "good",
    userId: "123",
    productId: "90",
    createdAt: new Date(),
    updatedAt: new Date(),
    imageId: "/path/to/object",
    certified: true,
    rating: 2,
    featuredRating: [
      {
        rating: 2,
        feature: "z.string()",
      },
    ],
  },
  {
    id: 2,
    text: "good",
    userId: "124",
    productId: "93",
    createdAt: new Date(),
    updatedAt: new Date(),
    imageId: "/path/to/object",
    certified: false,
    rating: 2,
    featuredRating: [
      {
        rating: 4,
        feature: "z.string()",
      },
    ],
  },
];

export const orders = [
  {
    userId: "1",
    productId: ["90", "180"],
  },
  {
    userId: "2",
    productId: ["91", "182"],
  },
];

export class ReviewRepository {
  async findAllAsync(): Promise<Review[]> {
    return reviews;
  }

  async findByIdAsync(id: number): Promise<Review | null> {
    return reviews.find((review) => review.id === id) || null;
  }

  async create(review: Partial<Review>): Promise<Review> {
    const newReview: Review = {
      id: Math.random(),
      text: review.text || "",
      userId: review.userId || "",
      createdAt: new Date(),
      updatedAt: new Date(),
      certified: review.certified || false,
      imageId: review.imageId || "",
      productId: review.productId || "",
      rating: review.rating || 0,
      featuredRating: review.featuredRating || [],
    };
    reviews.push(newReview);
    return newReview;
  }
  async findAllByProductId(productId: string): Promise<Review[]> {
    return reviews.filter((review) => review.productId === productId);
  }
}
