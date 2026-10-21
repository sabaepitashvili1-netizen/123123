import { describe, expect, it } from "vitest";
import { existsSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { courses, totalCoursePrice } from "./catalog";
describe("Course catalog media and duration contract", () => {
  it("covers every category with the requested duration and matching total", () => {
    const durations = { tech: 6, design: 3, business: 3, content: 2, other: 2 };
    expect(courses).toHaveLength(20);
    for (const c of courses) {
      expect(c.durationMonths).toBe(durations[c.category]);
      expect(totalCoursePrice(c)).toBe(durations[c.category] * 100);
    }
  });
  it("has a unique route and matching local photo and thumbnail for every course", () => {
    expect(new Set(courses.map((c) => c.slug)).size).toBe(courses.length);
    expect(new Set(courses.map((c) => c.image)).size).toBe(courses.length);
    for (const c of courses) {
      for (const file of [c.image, c.thumbnail]) {
        const target = resolve(process.cwd(), "public", file.slice(1));
        expect(existsSync(target)).toBe(true);
        expect(statSync(target).size).toBeGreaterThan(1000);
      }
      expect(c.thumbnail).toContain(c.slug);
      expect(c.image).toContain(c.slug);
    }
  });
});
