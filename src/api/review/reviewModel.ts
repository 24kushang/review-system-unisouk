import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

// import { commonValidations } from "@/common/utils/commonValidation";

extendZodWithOpenApi(z);

export type Review = z.infer<typeof ReviewSchema>;
export const ReviewSchema = z.object({
  // id: z.number(),
  // name: z.string(),
  // email: z.string().email(),
  // age: z.number(),
  // createdAt: z.date(),
  // updatedAt: z.date(),
  id: z.number(),
  text: z.string(),
  userId: z.string(),
  productId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  imageId: z.string(),
  certified: z.boolean(),
  rating: z.number(),
  featuredRating: z.array(
    z.object({
      rating: z.number(),
      feature: z.string(),
    })
  ),
});

// Input Validation for 'GET users/:id' endpoint
// export const GetUserSchema = z.object({
//   params: z.object({ id: commonValidations.id }),
// });
