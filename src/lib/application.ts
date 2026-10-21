import { createServerFn } from "@tanstack/react-start";
import { applicationInput } from "./application-schema";
export const submitApplication = createServerFn({ method: "POST" })
  .validator(applicationInput)
  .handler(async ({ data }) => {
    const { saveApplication } = await import("./application.server");
    return saveApplication(data);
  });
