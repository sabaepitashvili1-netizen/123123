import { z } from "zod";
import { findCourse } from "@/content/catalog";
export const applicationInput = z.object({
  name: z.string().trim().min(2, "შეიყვანე სახელი და გვარი.").max(100),
  email: z.string().trim().email("შეიყვანე სწორი ელფოსტა.").max(254),
  phone: z
    .string()
    .trim()
    .max(30)
    .refine((v) => !v || /^[+\d\s()\-]{6,30}$/.test(v), "შეამოწმე ტელეფონის ნომერი."),
  course: z.string().refine((slug) => Boolean(findCourse(slug)), "აირჩიე არსებული კურსი."),
  consent: z.literal(true, { errorMap: () => ({ message: "განაცხადისთვის საჭიროა თანხმობა." }) }),
  website: z.string().max(0),
});
export type ApplicationInput = z.infer<typeof applicationInput>;
