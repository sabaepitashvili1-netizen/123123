import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Compass,
  BookOpen,
  Send,
  RotateCcw,
  LoaderCircle,
  Check,
  MessageCircle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { courses, categories, type Category } from "@/content/catalog";
import { getAssistantStatus, sendAssistantMessage } from "@/lib/assistant";
import { recentAssistantMessages, type AssistantInput } from "@/lib/assistant-schema";

type Mode = "career" | "learn";
type Message = { role: "user" | "assistant"; content: string };
const interestOptions = categories.filter((c) => c.id !== "all");
const experienceOptions = [
  "სულ თავიდან ვიწყებ",
  "ცოტა გამოცდილება მაქვს",
  "ცოდნის გაღრმავება მინდა",
];
const timeOptions = ["კვირაში 2–3 საათი", "კვირაში 4–6 საათი", "კვირაში 7+ საათი"];
const greetings: Record<Mode, string> = {
  career:
    "გამარჯობა! ერთად აღმოვაჩინოთ, რომელი მიმართულება გაინტერესებს. დაიწყე მოკლე კითხვარით ან მომიყევი შენს ინტერესებზე.",
  learn:
    "რაზე მუშაობ დღეს? აირჩიე კურსი და მომწერე კითხვა — აგიხსნი მაგალითით და შემოგთავაზებ პატარა სავარჯიშოს.",
};
function RichMessage({ text }: { text: string }) {
  return (
    <>
      {text.split(/(```[\s\S]*?```)/g).map((part, i) =>
        part.startsWith("```") ? (
          <pre key={i}>
            <code>{part.replace(/^```[^\n]*\n?/, "").replace(/```$/, "")}</code>
          </pre>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}
export function CareerAssistant() {
  const [open, setOpen] = useState(false),
    [mode, setMode] = useState<Mode>("career"),
    [status, setStatus] = useState<"checking" | "ready" | "setup" | "error">("checking");
  const [histories, setHistories] = useState<Record<Mode, Message[]>>({ career: [], learn: [] });
  const [input, setInput] = useState(""),
    [busy, setBusy] = useState(false),
    [error, setError] = useState(""),
    [failed, setFailed] = useState<AssistantInput | null>(null);
  const [quiz, setQuiz] = useState(false),
    [step, setStep] = useState(0),
    [interest, setInterest] = useState<Category | null>(null),
    [experience, setExperience] = useState(""),
    [time, setTime] = useState(""),
    [done, setDone] = useState(false),
    [course, setCourse] = useState(courses[0]!.title);
  const bottom = useRef<HTMLDivElement>(null),
    scrollArea = useRef<HTMLDivElement>(null),
    inFlight = useRef(false);
  const messages = histories[mode];
  useEffect(() => {
    const show = (event: Event) => {
      const detail = (event as CustomEvent<{ course?: string }>).detail;
      if (detail?.course && courses.some((c) => c.title === detail.course)) {
        setCourse(detail.course);
        setMode("learn");
      } else {
        setMode("career");
        setQuiz(true);
        setStep(0);
        setDone(false);
      }
      setOpen(true);
    };
    window.addEventListener("skillflow:guide", show);
    return () => window.removeEventListener("skillflow:guide", show);
  }, []);
  useEffect(() => {
    if (!open) return;
    let active = true;
    getAssistantStatus()
      .then((r) => {
        if (active) setStatus(r.configured ? "ready" : "setup");
      })
      .catch(() => {
        if (active) setStatus("error");
      });
    return () => {
      active = false;
    };
  }, [open]);
  useEffect(() => {
    if (open && (messages.length || busy))
      bottom.current?.scrollIntoView({ behavior: "instant", block: "nearest" });
  }, [open, messages, busy]);
  useEffect(() => {
    const area = scrollArea.current;
    if (!open || !area) return;
    const target =
      mode === "career" && quiz
        ? area.querySelector<HTMLElement>(done ? ".guide-results" : ".guide-quiz")
        : null;
    area.scrollTop = target
      ? target.getBoundingClientRect().top - area.getBoundingClientRect().top + area.scrollTop - 12
      : 0;
  }, [open, mode, quiz, step, done]);
  const profile = done
    ? `${categories.find((c) => c.id === interest)?.label}; ${experience}; ${time}`
    : "";
  async function request(payload: AssistantInput) {
    if (inFlight.current) return;
    inFlight.current = true;
    setBusy(true);
    setError("");
    setFailed(null);
    try {
      const r = await sendAssistantMessage({ data: payload });
      if (r.ok) {
        setHistories((h) => ({
          ...h,
          [payload.mode]: [...h[payload.mode], { role: "assistant", content: r.text }],
        }));
      } else {
        setError(r.message);
        setFailed(payload);
        if (r.code === "unconfigured") setStatus("setup");
      }
    } catch {
      setError("პასუხი ვერ მივიღეთ. სცადე ხელახლა — შენი კითხვა არ დაიკარგება.");
      setFailed(payload);
    } finally {
      inFlight.current = false;
      setBusy(false);
    }
  }
  function send(text: string) {
    if (!text.trim() || busy || inFlight.current || status !== "ready") return;
    const message: Message = { role: "user", content: text.trim() };
    const next = [...messages, message];
    setHistories((h) => ({ ...h, [mode]: next }));
    setInput("");
    void request({ mode, course, profile, messages: recentAssistantMessages(next) });
  }
  function reset() {
    if (busy) return;
    setHistories((h) => ({ ...h, [mode]: [] }));
    setError("");
    setFailed(null);
    setInput("");
    if (mode === "career") {
      setQuiz(false);
      setStep(0);
      setDone(false);
      setInterest(null);
      setExperience("");
      setTime("");
    }
  }
  function startQuiz() {
    setQuiz(true);
    setStep(0);
    setDone(false);
    setInterest(null);
    setExperience("");
    setTime("");
    setError("");
  }
  function switchMode(next: Mode) {
    if (busy) return;
    setMode(next);
    setInput("");
    setError("");
    setFailed(null);
  }
  const recommendations = interest
    ? courses.filter((c) => c.category === interest).slice(0, 3)
    : [];
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="guide-launcher" aria-label="AI ასისტენტის გახსნა">
          <span>
            <Sparkles size={21} />
          </span>
          <span>
            <strong>შენი შემდეგი ნაბიჯი?</strong>
            <small>ჰკითხე SkillFlow Guide-ს</small>
          </span>
          <MessageCircle size={17} />
        </button>
      </DialogTrigger>
      <DialogContent className="guide-panel">
        <div className="guide-heading">
          <span className="guide-symbol">
            <Sparkles size={23} />
          </span>
          <div>
            <DialogTitle>SkillFlow Guide</DialogTitle>
            <DialogDescription>შენი პროფესიისა და სწავლის მეგზური</DialogDescription>
          </div>
        </div>
        <div className="guide-modes" role="group" aria-label="ასისტენტის რეჟიმი">
          <button
            disabled={busy}
            className={mode === "career" ? "active" : ""}
            aria-pressed={mode === "career"}
            onClick={() => switchMode("career")}
          >
            <Compass size={16} />
            პროფესიის არჩევა
          </button>
          <button
            disabled={busy}
            className={mode === "learn" ? "active" : ""}
            aria-pressed={mode === "learn"}
            onClick={() => switchMode("learn")}
          >
            <BookOpen size={16} />
            სწავლაში დახმარება
          </button>
        </div>
        <div className={`guide-status status-${status}`} role="status">
          <span className="live-dot" />
          {status === "checking"
            ? "კავშირის შემოწმება…"
            : status === "ready"
              ? "AI ჩატი მზადაა"
              : status === "setup"
                ? "AI ჩატი გააქტიურებას ელოდება · კითხვარი ხელმისაწვდომია"
                : "კავშირის შემოწმება ვერ მოხერხდა"}
          {status === "error" && (
            <button
              onClick={() => {
                setOpen(false);
                setTimeout(() => setOpen(true), 0);
              }}
            >
              თავიდან
            </button>
          )}
        </div>
        <div className="guide-scroll" ref={scrollArea}>
          <div className="guide-welcome">
            <span className="guide-mini">
              <Sparkles size={15} />
            </span>
            <h3>
              {mode === "career" ? "შენში ბევრი შესაძლებლობაა." : "რთული თემა? გავამარტივოთ."}
            </h3>
            <p>{greetings[mode]}</p>
          </div>
          {mode === "career" && !quiz && (
            <div className="guide-starter">
              <div className="guide-path-graphic">
                <span>
                  <Compass />
                </span>
                <i />
                <span>
                  <Code2Icon />
                </span>
                <i />
                <span>
                  <Check />
                </span>
              </div>
              <strong>3 კითხვა. შენი მიმართულებები.</strong>
              <p>ინტერესები, გამოცდილება და დრო — მიიღე საწყისი გზამკვლევი.</p>
              <button className="sf-button" onClick={startQuiz}>
                იპოვე შენი მიმართულება
                <ArrowRight size={16} />
              </button>
              <small>კითხვარი მუშაობს AI კავშირის გარეშეც.</small>
            </div>
          )}
          {mode === "career" && quiz && !done && (
            <div className="guide-quiz">
              <div className="quiz-top">
                <span>შენი პროფილი</span>
                <small>{step + 1} / 3</small>
              </div>
              <div className="quiz-progress">
                {[0, 1, 2].map((i) => (
                  <i key={i} className={i <= step ? "active" : ""} />
                ))}
              </div>
              <h4>
                {
                  [
                    "რა გაინტერესებს ყველაზე მეტად?",
                    "რა გამოცდილებით იწყებ?",
                    "რამდენ დროს დაუთმობ სწავლას?",
                  ][step]
                }
              </h4>
              <div className="quiz-options">
                {(step === 0
                  ? interestOptions.map((c) => ({ value: c.id, label: c.label }))
                  : (step === 1 ? experienceOptions : timeOptions).map((s) => ({
                      value: s,
                      label: s,
                    }))
                ).map((o) => (
                  <button
                    key={o.value}
                    onClick={() => {
                      if (step === 0) {
                        setInterest(o.value as Category);
                        setStep(1);
                      } else if (step === 1) {
                        setExperience(o.value);
                        setStep(2);
                      } else {
                        setTime(o.value);
                        setDone(true);
                      }
                    }}
                  >
                    {o.label}
                    <ArrowUpRight size={15} />
                  </button>
                ))}
              </div>
              {step > 0 && (
                <button className="quiz-back" onClick={() => setStep((s) => s - 1)}>
                  <ArrowLeft size={14} />
                  წინა კითხვა
                </button>
              )}
            </div>
          )}
          {mode === "career" && done && (
            <div className="guide-results">
              <span className="guide-result-label">
                <Check size={14} />
                კითხვარის შედეგი · საწყისი გზამკვლევი
              </span>
              <h4>აი, საიდან შეგიძლია დაიწყო.</h4>
              <p>
                {experience} · {time}
              </p>
              {recommendations.map((c) => (
                <a className="guide-course" key={c.title} href={`/courses/${c.slug}`}>
                  <span>
                    <img src={c.thumbnail} alt={c.imageAlt} loading="lazy" />
                  </span>
                  <div>
                    <strong>{c.title}</strong>
                    <small>ნახე გეგმა და შედეგი · {c.durationMonths} თვე · 100 ₾/თვე</small>
                  </div>
                  <ArrowUpRight size={17} />
                </a>
              ))}
              <div className="guide-study-plan">
                <strong>შენი პირველი კვირა</strong>
                <p>
                  {experience === experienceOptions[0]
                    ? "გაეცანი საფუძვლებს და შექმენი ერთი პატარა მაგალითი."
                    : "სცადე მოკლე პრაქტიკული ამოცანა და გამოავლინე, რის გამეორება გჭირდება."}{" "}
                  {time === timeOptions[0]
                    ? "დაგეგმე ორი 30-წუთიანი სესია და ერთი პრაქტიკული საათი."
                    : time === timeOptions[1]
                      ? "გამოყავი სამი საათი ახსნისთვის და ორი საათი პრაქტიკისთვის."
                      : "გაანაწილე სწავლა ოთხ დღეზე და ერთი სესია პროექტს დაუთმე."}
                </p>
              </div>
              <small>
                შერჩევა ეფუძნება შენს პასუხებსა და საიტის კატალოგს; ეს არ არის უნარების ტესტი ან
                დასაქმების გარანტია.
              </small>
              <button className="quiz-back" onClick={startQuiz}>
                <RotateCcw size={13} />
                კითხვარის თავიდან გავლა
              </button>
            </div>
          )}
          {mode === "learn" && (
            <div className="guide-learning-context">
              <label htmlFor="guide-course">რომელ კურსზე ვისაუბროთ?</label>
              <select
                id="guide-course"
                value={course}
                disabled={busy}
                onChange={(e) => setCourse(e.target.value)}
              >
                {courses.map((c) => (
                  <option key={c.title}>{c.title}</option>
                ))}
              </select>
              {done && (
                <small>
                  შენი პროფილი: {experience} · {time}
                </small>
              )}
              <div className="guide-suggestions">
                {[
                  "ამიხსენი პირველი თემა მარტივად",
                  "შემომთავაზე პრაქტიკული დავალება",
                  "შემიდგინე ერთკვირიანი სასწავლო გეგმა",
                ].map((s) => (
                  <button disabled={busy || status !== "ready"} key={s} onClick={() => send(s)}>
                    {s}
                    <ArrowUpRight size={12} />
                  </button>
                ))}
              </div>
              {status === "setup" && (
                <p className="guide-setup-note">
                  კურსის არჩევა შეგიძლია ახლავე. პერსონალური ახსნა და სავარჯიშოები AI ჩატის
                  გააქტიურების შემდეგ გახდება ხელმისაწვდომი.
                </p>
              )}
            </div>
          )}
          <div className="guide-messages" role="log" aria-label="საუბარი" aria-live="polite">
            {messages.map((m, i) => (
              <div className={`guide-message ${m.role}`} key={i}>
                <span>{m.role === "user" ? "შენ" : "SkillFlow Guide"}</span>
                <div>
                  <RichMessage text={m.content} />
                </div>
              </div>
            ))}
            {busy && (
              <div className="guide-thinking">
                <LoaderCircle size={15} />
                <span>შენთვის პასუხს ვამზადებ…</span>
              </div>
            )}
          </div>
          {error && (
            <div className="guide-error" role="alert">
              <p>{error}</p>
              {failed && status === "ready" && (
                <button onClick={() => void request(failed)}>
                  ხელახლა ცდა
                  <RotateCcw size={13} />
                </button>
              )}
            </div>
          )}
          <div ref={bottom} />
        </div>
        <div className="guide-composer">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <label className="sr-only" htmlFor="guide-input">
              შეტყობინება ასისტენტს
            </label>
            <textarea
              id="guide-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={busy || status !== "ready"}
              maxLength={2000}
              rows={2}
              placeholder={
                status === "ready"
                  ? "მომიყევი, რაში დაგეხმარო…"
                  : "AI ჩატი ჯერ არ არის გააქტიურებული"
              }
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                  e.preventDefault();
                  send(input);
                }
              }}
            />
            <button
              type="submit"
              aria-label="შეტყობინების გაგზავნა"
              disabled={!input.trim() || busy || status !== "ready"}
            >
              {busy ? <LoaderCircle size={18} /> : <Send size={18} />}
            </button>
          </form>
          <div className="guide-footnote">
            <span>
              {status === "ready"
                ? "შეტყობინებები იგზავნება OpenAI-ში. AI შეიძლება შეცდეს."
                : "კითხვარის პასუხები ამ გვერდის მეხსიერებაში რჩება."}
            </span>
            <button disabled={busy} aria-label="ახალი საუბარი" onClick={reset}>
              <RotateCcw size={12} />
              თავიდან
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
function Code2Icon() {
  return <BookOpen size={20} />;
}
