import { useState } from "react";
import { ArrowUpRight, Check, LoaderCircle, ShieldCheck } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { applicationInput } from "@/lib/application-schema";
import { submitApplication } from "@/lib/application";
import type { Course } from "@/content/catalog";
export function CourseApplication({
  course,
  open,
  onOpenChange,
}: {
  course: Course;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");
  async function send(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const parsed = applicationInput.safeParse({
      name,
      email,
      phone,
      consent,
      website,
      course: course.slug,
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "გადაამოწმე ველები.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      const result = await submitApplication({ data: parsed.data });
      if (result.ok) {
        setReference(result.id);
        setName("");
        setEmail("");
        setPhone("");
      } else setError(result.message);
    } catch {
      setError("კავშირი ვერ შედგა. შენი მონაცემები ველებში დარჩა — სცადე ხელახლა.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="application-dialog">
        <div className="application-visual">
          <img src={course.thumbnail} alt="" />
          <span>შენი შემდეგი ნაბიჯი</span>
          <strong>{course.title}</strong>
        </div>
        {reference ? (
          <div className="application-success" role="status">
            <span>
              <Check size={28} />
            </span>
            <DialogTitle>შენი პირველი ნაბიჯი შენახულია.</DialogTitle>
            <DialogDescription>
              განაცხადის ნომერი: {reference}. განაცხადი ინტერესის დაფიქსირებაა; ჩარიცხვა და გადახდა
              ცალკე დასტურდება.
            </DialogDescription>
            <button className="sf-button" onClick={() => onOpenChange(false)}>
              კურსზე დაბრუნება
              <ArrowUpRight size={17} />
            </button>
          </div>
        ) : (
          <form onSubmit={send} className="application-form">
            <span className="eyebrow">დაახლოებით 1 წუთი · უფასო განაცხადი</span>
            <DialogTitle>დავიწყოთ შენი ახალი თავი.</DialogTitle>
            <DialogDescription>
              დატოვე საკონტაქტო ინფორმაცია ამ მიმართულებით ინტერესის დასაფიქსირებლად.
            </DialogDescription>
            <label htmlFor="application-name">
              სახელი და გვარი
              <input
                id="application-name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                minLength={2}
                maxLength={100}
                placeholder="შენი სახელი"
              />
            </label>
            <label htmlFor="application-email">
              ელფოსტა
              <input
                id="application-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                maxLength={254}
                placeholder="name@example.com"
              />
            </label>
            <label htmlFor="application-phone">
              ტელეფონი <small>არასავალდებულო</small>
              <input
                id="application-phone"
                type="tel"
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                maxLength={30}
                placeholder="+995"
              />
            </label>
            <label className="application-trap" aria-hidden="true">
              ვებსაიტი
              <input
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </label>
            <label className="application-consent">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                required
              />
              <span>
                ვეთანხმები მონაცემების შენახვასა და გამოყენებას მხოლოდ ამ განაცხადთან დაკავშირებით.
              </span>
            </label>
            <details className="application-privacy">
              <summary>როგორ გამოიყენება ჩემი ინფორმაცია?</summary>
              <p>
                ინახება სახელი, ელფოსტა, სურვილის შემთხვევაში ტელეფონი და არჩეული კურსი. ეს ფორმა არ
                ქმნის ანგარიშს და არ ამუშავებს გადახდას. მონაცემები გამოიყენება მხოლოდ განაცხადის
                დამუშავებისა და მასზე კომუნიკაციისთვის.
              </p>
            </details>
            {error && (
              <p className="application-error" role="alert">
                {error}
              </p>
            )}
            <button className="sf-button" disabled={busy} type="submit">
              {busy ? (
                <>
                  <LoaderCircle className="application-spinner" size={18} />
                  იგზავნება…
                </>
              ) : (
                <>
                  განაცხადის გაგზავნა
                  <ArrowUpRight size={18} />
                </>
              )}
            </button>
            <small className="application-assurance">
              <ShieldCheck size={15} />
              ბარათის მონაცემები არ გჭირდება
            </small>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
