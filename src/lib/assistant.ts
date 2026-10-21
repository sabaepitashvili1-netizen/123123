import { createServerFn } from "@tanstack/react-start";
import { assistantInput } from "./assistant-schema";

export const getAssistantStatus = createServerFn({ method: "GET" }).handler(async () => {
  const { isAssistantConfigured } = await import("./assistant.server");
  return { configured: isAssistantConfigured() };
});

export const sendAssistantMessage = createServerFn({ method: "POST" })
  .validator(assistantInput)
  .handler(async ({ data }) => {
    const { getAssistantReply } = await import("./assistant.server");
    return getAssistantReply(data);
  });
