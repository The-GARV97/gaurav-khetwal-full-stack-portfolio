import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter at least 2 characters.")
    .max(80, "That name is too long."),
  email: z.string().trim().email("Enter a valid email address.").max(160),
  subject: z
    .string()
    .trim()
    .min(3, "Give the message a short subject.")
    .max(120, "Subject is too long."),
  message: z
    .string()
    .trim()
    .min(20, "Tell me a bit more — at least 20 characters.")
    .max(4000, "Message is too long."),
});

export type ContactValues = z.infer<typeof contactSchema>;
