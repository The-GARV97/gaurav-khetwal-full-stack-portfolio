import { createServerFn } from "@tanstack/react-start";
import { contactSchema } from "./contact-schema";
import { submitContact } from "./contact.server";

export const sendContactMessage = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }) => submitContact(data));
