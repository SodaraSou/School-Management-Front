import { z } from "zod";

export const announcementSchema = z.object({
  caption: z.string().min(1, {
    message: "Caption Required",
  }),
});
