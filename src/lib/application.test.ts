import { describe, expect, it, vi, afterEach } from "vitest";
import { courses } from "@/content/catalog";
import { courseExperience } from "@/content/course-experience";
import { applicationInput } from "./application-schema";
import { saveApplication } from "./application.server";
const valid = {
  name: "Test Learner",
  email: "learner@example.com",
  phone: "+995 555 00 00 00",
  course: "frontend",
  consent: true as const,
  website: "",
};
afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});
describe("Course decision and application journey", () => {
  it("provides an outcome and exactly one step per month for every offered course", () => {
    for (const course of courses) {
      const detail = courseExperience(course);
      expect(detail.outcome.deliverable).toBeTruthy();
      expect(detail.months).toHaveLength(course.durationMonths);
      expect(detail.months.every((month) => Boolean(month.topic))).toBe(true);
    }
  });
  it("requires valid contact details, consent, a real course and an empty honeypot", () => {
    expect(applicationInput.safeParse(valid).success).toBe(true);
    expect(applicationInput.safeParse({ ...valid, phone: "" }).success).toBe(true);
    for (const invalid of [
      { email: "bad" },
      { consent: false },
      { course: "missing" },
      { website: "spam" },
      { phone: "wrong-phone" },
    ]) {
      expect(applicationInput.safeParse({ ...valid, ...invalid }).success).toBe(false);
    }
  });
  it("never claims production submission succeeded without a receiver", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("APPLICATION_WEBHOOK_URL", "");
    expect((await saveApplication(valid)).ok).toBe(false);
  });
  it("returns a receipt only after the configured receiver accepts the application", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("APPLICATION_WEBHOOK_URL", "https://example.com/applications");
    const fetchMock = vi.fn().mockResolvedValue({ ok: false });
    vi.stubGlobal("fetch", fetchMock);
    expect((await saveApplication(valid)).ok).toBe(false);
    fetchMock.mockResolvedValue({ ok: true });
    const result = await saveApplication(valid);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.id).toMatch(/^SF-/);
    const record = JSON.parse(fetchMock.mock.calls[1]![1].body);
    expect(record).toMatchObject({
      course: "frontend",
      email: "learner@example.com",
      consent: true,
    });
    expect((await saveApplication(valid)).ok).toBe(false);
  });
});
