import { z } from "zod";

export const assistantInput = z
  .object({
    mode: z.enum(["career", "learn"]),
    course: z.string().max(100).optional(),
    profile: z.string().max(1000).optional(),
    messages: z
      .array(
        z
          .object({
            role: z.enum(["user", "assistant"]),
            content: z.string().trim().min(1).max(6000),
          })
          .refine((m) => m.role !== "user" || m.content.length <= 2000, "User message too long"),
      )
      .min(1)
      .max(16),
  })
  .refine((v) => v.messages.at(-1)?.role === "user", "Last message must be from user")
  .refine(
    (v) => v.messages.reduce((n, m) => n + m.content.length, 0) <= 18000,
    "Conversation too long",
  );

export type AssistantInput = z.infer<typeof assistantInput>;

export function recentAssistantMessages(messages: AssistantInput["messages"]) {
  const recent = messages
    .slice(-15)
    .map((m) => ({ ...m, content: m.content.slice(0, m.role === "user" ? 2000 : 6000) }));
  while (recent.reduce((n, m) => n + m.content.length, 0) > 16000) recent.shift();
  return recent;
}
export type AssistantReply =
  | { ok: true; text: string }
  | { ok: false; code: "unconfigured" | "busy" | "unavailable" | "timeout"; message: string };
