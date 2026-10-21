import type { ApplicationInput } from "./application-schema";
const attempts = new Map<string, number>();
export async function saveApplication(data: ApplicationInput) {
  const email = data.email.toLowerCase();
  const last = attempts.get(email);
  if (last && Date.now() - last < 60_000)
    return {
      ok: false as const,
      message: "განაცხადი ახლახან გაიგზავნა. ხელახლა ცდამდე ერთი წუთი მოიცადე.",
    };
  const id = `SF-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
  const record = {
    id,
    name: data.name,
    email,
    phone: data.phone,
    course: data.course,
    consent: true,
    createdAt: new Date().toISOString(),
  };
  try {
    const webhook = process.env["APPLICATION_WEBHOOK_URL"];
    if (webhook) {
      const url = new URL(webhook);
      if (url.protocol !== "https:") throw new Error("Secure application endpoint required");
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record),
        signal: AbortSignal.timeout(15_000),
      });
      if (!response.ok) throw new Error("Application delivery failed");
    } else if (process.env["NODE_ENV"] !== "production") {
      const { mkdir, appendFile } = await import("node:fs/promises");
      const { resolve } = await import("node:path");
      const folder = resolve(process.cwd(), ".data");
      await mkdir(folder, { recursive: true });
      await appendFile(resolve(folder, "applications.jsonl"), JSON.stringify(record) + "\n", {
        encoding: "utf8",
        mode: 0o600,
      });
    } else {
      return {
        ok: false as const,
        message: "განაცხადების მიღება ჯერ არ არის გახსნილი. სცადე მოგვიანებით.",
      };
    }
    for (const [key, time] of attempts) if (Date.now() - time > 60_000) attempts.delete(key);
    attempts.set(email, Date.now());
    return { ok: true as const, id };
  } catch {
    return {
      ok: false as const,
      message: "განაცხადი ვერ შევინახეთ. გადაამოწმე კავშირი და სცადე ხელახლა.",
    };
  }
}
