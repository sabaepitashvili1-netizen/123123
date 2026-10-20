import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { categories, courses, type Category } from "@/content/catalog";
import mentor from "@/assets/ai-mentor.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SkillFlow AI — პროფესია 9 თვეში, 100 ₾/თვე" },
      { name: "description", content: "მაღალხარისხიანი განათლება ხელმისაწვდომ ფასად — AI მენტორის თანხლებით. 7-დღიანი უფასო საცდელი." },
      { property: "og:title", content: "SkillFlow AI — AI მენტორი შენი პროფესიისთვის" },
      { property: "og:description", content: "9-თვიანი პროგრამა, AI ავატარ ლექტორი, სერტიფიკატი. 100 ₾/თვე." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const months = ["საფუძვლები", "ძირითადი ინსტრუმენტები", "პრაქტიკა", "პროექტები", "შუალედური გამოცდა", "სიღრმისეული თემები", "გუნდური სამუშაო", "პორტფოლიო", "კაპსტოუნი + ფინალური"];

const faqs: [string, string][] = [
  ["შემიძლია ნებისმიერ დროს გაუქმება?", "დიახ. ხელშეკრულება არ არის — იხდი თვიურად და აუქმებ როცა გინდა. პროგრესი ინახება 12 თვე."],
  ["როგორ მუშაობს AI ლექტორი?", "ყოველ ლექციას ატარებს AI ავატარი, რომელსაც ნებისმიერ მომენტში შეგიძლია შეეკითხო ტექსტით ან ხმით."],
  ["მივიღებ სერტიფიკატს?", "დიახ — 9 თვის დასრულების შემდეგ იღებ ვერიფიცირებად სერტიფიკატს საჯარო ბმულით."],
  ["თანხის დაბრუნება?", "პირველი გადახდიდან 7 დღეში სრული თანხა ბრუნდება, თუ კურსის 10%-ზე ნაკლები გაქვს გავლილი."],
  ["შემიძლია პაუზა?", "დიახ, თითო კურსზე 2 თვემდე. ამ დროს გადახდა ჩერდება, პროგრესი ინახება."],
];

function Index() {
  const [cat, setCat] = useState<Category | "all">("all");
  const list = courses.filter((c) => cat === "all" || c.category === cat);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <span className="text-xl font-extrabold"><span className="text-brand">SkillFlow</span> AI</span>
          <nav className="hidden gap-6 text-sm text-muted-foreground md:flex">
            <a href="#how">როგორ მუშაობს</a><a href="#catalog">კურსები</a><a href="#pricing">ფასი</a><a href="#faq">FAQ</a>
          </nav>
          <Button variant="hero" size="sm">დაიწყე უფასოდ</Button>
        </div>
      </header>

      <section className="bg-soft">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
          <div>
            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">AI მენტორი 24/7</span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight md:text-5xl">
              ისწავლე პროფესია <span className="text-brand">9 თვეში</span> — 100 ₾ თვეში
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">მაღალხარისხიანი განათლება ხელმისაწვდომ ფასად — AI მენტორის თანხლებით.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="hero" size="lg" className="h-12 px-8">დაიწყე 7-დღიანი საცდელი</Button>
              <Button variant="outline" size="lg" className="h-12 rounded-full" asChild><a href="#demo">ნახე დემო</a></Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">გაუქმება ნებისმიერ დროს · ბარათი საცდელისთვის არ საჭიროა</p>
          </div>
          <img src={mentor} alt="AI ლექტორი" width={1024} height={1024} className="aspect-square w-full rounded-3xl object-cover shadow-elegant" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border bg-muted p-8">
            <h3 className="text-sm font-semibold text-muted-foreground">ბუთქემფები</h3>
            <p className="mt-2 text-3xl font-bold">3 000 – 8 000 ₾</p>
            <ul className="mt-4 space-y-2 text-muted-foreground"><li>· ფიქსირებული განრიგი</li><li>· წინასწარი გადახდა</li><li>· ლექტორი მხოლოდ ლექციაზე</li></ul>
          </div>
          <div className="rounded-3xl bg-brand p-8 text-primary-foreground shadow-elegant">
            <h3 className="text-sm font-semibold opacity-80">SkillFlow AI</h3>
            <p className="mt-2 text-3xl font-bold">100 ₾ / თვე</p>
            <ul className="mt-4 space-y-2 opacity-90"><li>· შენი ტემპი და დღეები</li><li>· თვიური გადახდა, გაუქმება ნებისმიერ დროს</li><li>· AI მენტორი, რომელიც ყოველთვის პასუხობს</li></ul>
          </div>
        </div>
      </section>

      <section id="how" className="bg-muted/50 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold">9-თვიანი გზა</h2>
          <p className="mt-2 text-muted-foreground">ყოველ თვეს — მოდული, კვირეული ქვიზები, დავალებები და თვის გამოცდა.</p>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-9">
            {months.map((m, i) => (
              <div key={m} className="rounded-2xl border bg-card p-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand font-bold text-primary-foreground">{i + 1}</div>
                <p className="mt-3 text-sm font-medium">{m}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="catalog" className="mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-3xl font-bold">კურსები</h2>
        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map((c) => (
            <Button key={c.id} size="sm" variant={cat === c.id ? "default" : "outline"} className="rounded-full" onClick={() => setCat(c.id)} aria-pressed={cat === c.id}>{c.label}</Button>
          ))}
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((c) => (
            <div key={c.title} className="rounded-2xl border bg-card p-5 transition hover:shadow-elegant">
              {c.pilot && <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-semibold text-secondary-foreground">ახალი</span>}
              <p className="mt-2 font-semibold">{c.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">9 თვე · 100 ₾/თვე</p>
            </div>
          ))}
        </div>
      </section>

      <section id="demo" className="bg-muted/50 py-20">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-2">
          <img src={mentor} alt="" loading="lazy" width={1024} height={1024} className="aspect-video w-full rounded-3xl object-cover object-top" />
          <div className="rounded-3xl border bg-card p-6">
            <p className="text-sm font-semibold text-muted-foreground">ლექცია: React state</p>
            <div className="mt-4 space-y-3 text-sm">
              <p className="ml-auto w-fit max-w-[80%] rounded-2xl bg-primary px-4 py-2 text-primary-foreground">რატომ არ განახლდა კომპონენტი?</p>
              <p className="w-fit max-w-[85%] rounded-2xl bg-muted px-4 py-2">კარგი კითხვაა! შენ state-ს პირდაპირ ცვლი. სცადე setCount-ის გამოყენება — როგორ ფიქრობ, რას გააკეთებს React ამის შემდეგ?</p>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {["უფრო მარტივად ამიხსენი", "მაგალითი მომეცი", "გამომცადე", "უფრო ღრმად"].map((q) => (
                <span key={q} className="rounded-full border px-3 py-1 text-xs">{q}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-6xl px-4 py-20 text-center">
        <h2 className="text-3xl font-bold">ერთი მარტივი ფასი</h2>
        <div className="mx-auto mt-10 max-w-md rounded-3xl border bg-card p-8 shadow-elegant">
          <p className="text-5xl font-extrabold">100 ₾<span className="text-lg font-medium text-muted-foreground"> / თვე</span></p>
          <p className="mt-2 text-sm text-muted-foreground">9 თვე = 900 ₾ სულ · გაუქმება ნებისმიერ დროს</p>
          <ul className="mt-6 space-y-2 text-left text-sm">
            {["AI ავატარ ლექციები", "შეუზღუდავი კითხვები AI მენტორთან", "ქვიზები, დავალებები, გამოცდები", "ვერიფიცირებული სერტიფიკატი"].map((f) => <li key={f}>✓ {f}</li>)}
          </ul>
          <Button variant="hero" size="lg" className="mt-8 h-12 w-full">დაიწყე 7-დღიანი საცდელი</Button>
          <p className="mt-4 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">7-დღიანი თანხის დაბრუნების გარანტია</p>
        </div>
      </section>

      <section className="bg-muted/50 py-20">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 md:grid-cols-3">
          {[["ნინო, 24", "AI მენტორი ღამის 2 საათზეც მპასუხობდა. პირველი სამსახური 8 თვეში ვიპოვე."], ["გიორგი, 31", "სამსახურთან ერთად ვსწავლობდი — ჩემი დღეები, ჩემი ტემპი."], ["მარიამი, 19", "ბუთქემფის ფასის მეათედად იგივე ცოდნა მივიღე."]].map(([n, t]) => (
            <figure key={n} className="rounded-3xl border bg-card p-6"><blockquote className="text-sm">"{t}"</blockquote><figcaption className="mt-4 text-sm font-semibold">{n}</figcaption></figure>
          ))}
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-3xl px-4 py-20">
        <h2 className="text-3xl font-bold">ხშირი კითხვები</h2>
        <Accordion type="single" collapsible className="mt-6">
          {faqs.map(([q, a]) => (
            <AccordionItem key={q} value={q}><AccordionTrigger>{q}</AccordionTrigger><AccordionContent>{a}</AccordionContent></AccordionItem>
          ))}
        </Accordion>
      </section>

      <footer className="border-t py-10 text-center text-sm text-muted-foreground">© 2026 SkillFlow AI · თბილისი</footer>
    </div>
  );
}
