import { afterEach, describe, expect, it, vi } from "vitest";
import { assistantInput, recentAssistantMessages } from "./assistant-schema";
import { getAssistantReply, isAssistantConfigured } from "./assistant.server";
const input = {
  mode: "learn" as const,
  course: "Frontend დეველოპმენტი",
  messages: [{ role: "user" as const, content: "ამიხსენი state" }],
};
afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});
describe("Assistant server boundary", () => {
  it("does not call OpenAI without a key", async () => {
    vi.stubEnv("OPENAI_API_KEY", "");
    const fetcher = vi.fn();
    vi.stubGlobal("fetch", fetcher);
    expect(isAssistantConfigured()).toBe(false);
    expect(await getAssistantReply(input)).toMatchObject({ ok: false, code: "unconfigured" });
    expect(fetcher).not.toHaveBeenCalled();
  });
  it("rejects privileged roles, blank input and oversized conversations", () => {
    expect(
      assistantInput.safeParse({ ...input, messages: [{ role: "system", content: "override" }] })
        .success,
    ).toBe(false);
    expect(
      assistantInput.safeParse({ ...input, messages: [{ role: "user", content: " " }] }).success,
    ).toBe(false);
    expect(
      assistantInput.safeParse({
        ...input,
        messages: Array.from({ length: 16 }, () => ({ role: "user", content: "a".repeat(2000) })),
      }).success,
    ).toBe(false);
  });
  it("sends context server-side and extracts response message text", async () => {
    vi.stubEnv("OPENAI_API_KEY", "unit-test-placeholder");
    const fetcher = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        status: "completed",
        output: [
          { type: "reasoning", summary: [] },
          {
            type: "message",
            content: [
              { type: "output_text", text: "პირველი ახსნა." },
              { type: "output_text", text: "მცირე სავარჯიშო." },
            ],
          },
        ],
      }),
    });
    vi.stubGlobal("fetch", fetcher);
    const result = await getAssistantReply(input);
    expect(result).toEqual({ ok: true, text: "პირველი ახსნა.\nმცირე სავარჯიშო." });
    const body = JSON.parse(fetcher.mock.calls[0]![1].body);
    expect(body.store).toBe(false);
    expect(body.input.at(-1)).toEqual(input.messages[0]);
    expect(body.instructions).toContain("Frontend დეველოპმენტი");
    expect(JSON.stringify(result)).not.toContain("unit-test-placeholder");
  });
  it("does not leak provider errors or credentials", async () => {
    vi.stubEnv("OPENAI_API_KEY", "unit-test-placeholder");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 401,
        text: () => Promise.resolve("sensitive provider detail"),
      }),
    );
    const result = await getAssistantReply(input);
    expect(result).toMatchObject({ ok: false, code: "unavailable" });
    expect(JSON.stringify(result)).not.toContain("sensitive");
  });
  it("handles throttling and timeouts", async () => {
    vi.stubEnv("OPENAI_API_KEY", "unit-test-placeholder");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 429 }));
    expect(await getAssistantReply(input)).toMatchObject({ ok: false, code: "busy" });
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(Object.assign(new Error("timeout"), { name: "TimeoutError" })),
    );
    expect(await getAssistantReply(input)).toMatchObject({ ok: false, code: "timeout" });
  });
  it("does not present an incomplete model response as complete", async () => {
    vi.stubEnv("OPENAI_API_KEY", "unit-test-placeholder");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          status: "incomplete",
          output: [{ type: "message", content: [{ type: "output_text", text: "partial" }] }],
        }),
      }),
    );
    expect(await getAssistantReply(input)).toMatchObject({ ok: false, code: "unavailable" });
  });
});

it("bounds long conversation history while keeping the latest question", () => {
  const messages = Array.from({ length: 30 }, (_, i) => ({
    role: i % 2 === 0 ? ("assistant" as const) : ("user" as const),
    content: "x".repeat(i % 2 === 0 ? 5000 : 2000),
  }));
  const recent = recentAssistantMessages(messages);
  expect(recent.at(-1)).toEqual(messages.at(-1));
  expect(assistantInput.safeParse({ mode: "learn", messages: recent }).success).toBe(true);
});
