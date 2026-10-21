import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  Play,
  Sparkles,
  Check,
  Code2,
  Layers,
  Terminal,
  MousePointer2,
  Braces,
  CheckCheck,
  Folder,
  Award,
  BookOpen,
  Menu,
  X,
  Clock3,
  Palette,
  TrendingUp,
  Globe,
  Blocks,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { categories, courses, courseByTitle, type Category } from "@/content/catalog";
import mentor from "@/assets/ai-mentor.jpg";
import { PromoVideo } from "@/components/promo-video";
import { CareerAssistant } from "@/components/career-assistant";
import { courseOutcomes } from "@/content/course-experience";
import "@/premium.css";
export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "SkillFlow AI — შენი შემდეგი ნაბიჯი" },
      {
        name: "description",
        content: "ახალი პროფესია, შენი ტემპით. 2–6-თვიანი გზა, პრაქტიკული პროექტები და AI მენტორი.",
      },
    ],
  }),
  component: Index,
});
const fullStages = [
  {
    title: "საფუძვლები",
    text: "გაიცანი ახალი სფერო და ააწყვე შენი პირველი პატარა პროექტი.",
    output: "შენი პირველი ვებგვერდი",
    icon: BookOpen,
    code: "<h1>ჩემი ახალი დასაწყისი</h1>",
  },
  {
    title: "ინსტრუმენტები",
    text: "მოაწყვე სამუშაო გარემო და გაიცანი პროფესიული ინსტრუმენტები.",
    output: "შენი სამუშაო გარემო",
    icon: Terminal,
    code: "$ git commit -m 'first step'",
  },
  {
    title: "პრაქტიკა",
    text: "გადაიყვანე ცოდნა მოქმედებაში. ამოხსენი მცირე პრაქტიკული გამოწვევები.",
    output: "პრაქტიკული სავარჯიშოები",
    icon: Code2,
    code: "const progress = practice.repeat();",
  },
  {
    title: "პროექტები",
    text: "იდეიდან პირველ სამუშაო ვერსიამდე. შექმენი პროდუქტის პროტოტიპი.",
    output: "შენი პირველი აპლიკაცია",
    icon: Layers,
    code: "function App() { return <YourIdea />; }",
  },
  {
    title: "შუალედური ეტაპი",
    text: "შეამოწმე ცოდნა, აღმოაჩინე ძლიერი მხარეები და დაგეგმე შემდეგი ნაბიჯი.",
    output: "ცოდნის პერსონალური რუკა",
    icon: CheckCheck,
    code: "skills.filter(skill => skill.mastered)",
  },
  {
    title: "სიღრმისეული თემები",
    text: "ჩაუღრმავდი არჩეულ მიმართულებას და დაამატე პროექტს მეტი შესაძლებლობა.",
    output: "გაუმჯობესებული პროექტი",
    icon: Braces,
    code: "await unlockNextLevel();",
  },
  {
    title: "გუნდური სამუშაო",
    text: "ისწავლე იდეების გაზიარება, უკუკავშირის მიღება და გუნდთან ერთად შექმნა.",
    output: "გუნდური პროექტი",
    icon: Blocks,
    code: "team.map(person => person.superpower)",
  },
  {
    title: "პორტფოლიო",
    text: "შეკრიბე საუკეთესო ნამუშევრები ერთ სივრცეში და აჩვენე, რა შეგიძლია.",
    output: "შენი პირადი პორტფოლიო",
    icon: Folder,
    code: "export default YourPortfolio;",
  },
  {
    title: "ფინალური პროექტი",
    text: "გააერთიანე მთელი გამოცდილება ერთ დასრულებულ პროექტში.",
    output: "პროექტი + პრეზენტაცია",
    icon: Award,
    code: "const nextChapter = 'შენი მომავალი';",
  },
];
const stages = [
  fullStages[0]!,
  fullStages[1]!,
  fullStages[2]!,
  fullStages[3]!,
  fullStages[7]!,
  fullStages[8]!,
];
const phases = ["აღმოაჩინე", "შექმენი", "გაიზარდე"];
const demos = [
  {
    label: "მარტივად ამიხსენი",
    q: "რა არის React state?",
    a: "წარმოიდგინე მრიცხველი. state არის მისი მიმდინარე რიცხვი. setCount ცვლის ამ რიცხვს და React ეკრანზე ახალ მნიშვნელობას აჩვენებს.",
    code: "const [count, setCount] = useState(0);",
  },
  {
    label: "მაგალითი მაჩვენე",
    q: "როგორ გავზარდო რიცხვი?",
    a: "ღილაკზე დაჭერისას წინა მნიშვნელობას 1 დაუმატე. ქვემოთ მოცემული მრიცხველი სწორედ ამ პრინციპით მუშაობს — სცადე!",
    code: "onClick={() => setCount(c => c + 1)}",
  },
  {
    label: "გამომცადე",
    q: "მზად ვარ პატარა გამოწვევისთვის",
    a: "თუ count = 0 და ღილაკს სამჯერ დააჭერ, რა გამოჩნდება ეკრანზე? გამოცადე ქვემოთ და შეამოწმე შენი პასუხი.",
    code: "0 → 1 → 2 → ?",
  },
];
const faqs = [
  [
    "რა ღირს სწავლა?",
    "გეგმის ფასი არის 100 ₾ თვეში. ხანგრძლივობა კატეგორიის მიხედვით 2–6 თვეა; სრული ფასი — 200–600 ₾.",
  ],
  [
    "მჭირდება წინასწარი ცოდნა?",
    "სასწავლო გზა საფუძვლებით იწყება. პირველ ეტაპზე გაეცნობი სფეროს და მოაწყობ სამუშაო გარემოს.",
  ],
  [
    "როგორ მუშაობს AI მენტორი?",
    "მიმართულების კითხვარი ხელმისაწვდომია. მენტორის ვიდეო და სასწავლო დემო გამოცდილებას გაჩვენებს; თავისუფალი AI ჩატის გააქტიურება მზადდება.",
  ],
  [
    "როგორ დავიწყო?",
    "აირჩიე კურსი, გაეცანი გეგმას და უფასოდ დააფიქსირე ინტერესი განაცხადით. ანგარიშის შექმნა და გადახდა ჯერ არ არის ჩართული.",
  ],
];
const icons = { tech: Code2, design: Palette, business: TrendingUp, content: Globe, other: Blocks };
function Index() {
  const [month, setMonth] = useState(0),
    [cat, setCat] = useState<Category | "all">("all"),
    [search, setSearch] = useState(""),
    [expanded, setExpanded] = useState(false),
    [menu, setMenu] = useState(false),
    [demo, setDemo] = useState(0),
    [count, setCount] = useState(0),
    [selected, setSelected] = useState<string | null>(null);
  const stage = stages[month]!,
    Icon = stage.icon,
    list = courses.filter(
      (c) =>
        (cat === "all" || c.category === cat) &&
        `${c.title} ${c.description} ${c.topics.join(" ")} ${courseOutcomes[c.slug]?.tools ?? ""}`
          .toLocaleLowerCase()
          .includes(search.trim().toLocaleLowerCase()),
    );
  useEffect(() => {
    document.documentElement.classList.add("sf-motion");
    const o = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            o.unobserve(e.target);
          }
        }),
      { threshold: 0.08 },
    );
    document.querySelectorAll(".reveal").forEach((e) => o.observe(e));
    return () => o.disconnect();
  }, []);
  return (
    <div className="sf-site">
      <a className="skip-link" href="#main">
        მთავარ შინაარსზე გადასვლა
      </a>
      <header className="sf-header">
        <div className="sf-shell header-inner">
          <a href="/" className="wordmark">
            <span className="brand-symbol">
              <Layers size={21} />
            </span>
            SkillFlow<span className="ai-label">AI</span>
          </a>
          <nav className="desktop-nav" aria-label="მთავარი ნავიგაცია">
            <a href="#how">სასწავლო გზა</a>
            <a href="#catalog">კურსები</a>
            <a href="#demo">AI მენტორი</a>
            <a href="#pricing">ფასი</a>
          </nav>
          <div className="header-actions">
            <a href="#catalog" className="sf-button small">
              იპოვე შენი კურსი
              <ArrowUpRight size={15} />
            </a>
            <button
              className="menu-button"
              aria-label={menu ? "მენიუს დახურვა" : "მენიუს გახსნა"}
              aria-expanded={menu}
              onClick={() => setMenu(!menu)}
            >
              {menu ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {menu && (
          <nav className="mobile-nav">
            {[
              ["how", "სასწავლო გზა"],
              ["catalog", "კურსები"],
              ["demo", "AI მენტორი"],
              ["pricing", "ფასი"],
            ].map(([id, label]) => (
              <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>
                {label}
                <ArrowUpRight size={16} />
              </a>
            ))}
          </nav>
        )}
      </header>
      <main id="main">
        <section className="sf-hero sf-shell">
          <div className="hero-copy">
            <span className="eyebrow">
              <span className="live-dot" />
              ახალი უნარები. ახალი შესაძლებლობები.
            </span>
            <h1>
              შენი მომავალი.
              <br />
              შენი ტემპით.
              <br />
              <span>AI-სთან ერთად.</span>
            </h1>
            <p>
              იდეიდან პირველ პროექტამდე — ისწავლე ახალი პროფესია მენტორთან, რომელიც შენ გვერდითაა.
            </p>
            <div className="hero-actions">
              <a href="#catalog" className="sf-button">
                აღმოაჩინე კურსები
                <ArrowUpRight size={18} />
              </a>
              <a href="#demo" className="text-button">
                <span className="play-circle">
                  <Play size={12} fill="currentColor" />
                </span>
                ნახე როგორ მუშაობს
              </a>
            </div>
            <div className="hero-facts">
              <span>
                <Check />
                2–6-თვიანი გზა
              </span>
              <span>
                <Check />
                100 ₾ / თვე
              </span>
              <span>
                <Check />
                შენი განრიგით
              </span>
            </div>
            <button
              className="hero-guide-link"
              onClick={() => window.dispatchEvent(new CustomEvent("skillflow:guide"))}
            >
              <Sparkles size={14} /> არ იცი, რა აირჩიო? ჰკითხე მეგზურს <ArrowUpRight size={13} />
            </button>
          </div>
          <div className="hero-visual">
            <div className="visual-orbit orbit-one" />
            <div className="visual-orbit orbit-two" />
            <div className="learning-window">
              <div className="window-bar">
                <span className="window-dots">
                  <i />
                  <i />
                  <i />
                </span>
                <span>შენი სასწავლო სივრცე</span>
                <Sparkles size={14} />
              </div>
              <div className="lesson-image">
                <img src={mentor} alt="AI მენტორის ვიზუალური კონცეფცია" />
                <span className="image-badge">
                  <span className="live-dot" />
                  AI მენტორი
                </span>
                <a href="#demo" className="lesson-play" aria-label="მენტორის დემოს ნახვა">
                  <Play fill="currentColor" size={24} />
                </a>
                <div className="lesson-caption">
                  <small>მოდული 01 · საფუძვლები</small>
                  <strong>
                    დიდი იდეები იწყება
                    <br />
                    პატარა ნაბიჯით.
                  </strong>
                </div>
              </div>
              <div className="lesson-bottom">
                <div>
                  <small>შენი შემდეგი ნაბიჯი</small>
                  <strong>შექმენი პირველი პროექტი</strong>
                </div>
                <ArrowUpRight size={22} />
              </div>
            </div>
            <div className="floating-note note-progress">
              <span className="note-icon">
                <Check size={19} />
              </span>
              <div>
                <strong>ერთი ნაბიჯით წინ</strong>
                <small>ყოველი დღე ახალი პროგრესია</small>
              </div>
              <div className="tiny-bars">
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
            </div>
            <div className="floating-note note-ai">
              <Sparkles size={18} />
              <span>
                რთული კითხვა?
                <br />
                <strong>ერთად გავამარტივოთ.</strong>
              </span>
            </div>
          </div>
        </section>
        <div className="value-strip">
          <div className="sf-shell">
            <span>შექმნილია შენი განვითარებისთვის</span>
            <div>
              <Code2 />
              პროექტები
            </div>
            <div>
              <Sparkles />
              AI მხარდაჭერა
            </div>
            <div>
              <Clock3 />
              მოქნილი განრიგი
            </div>
            <div>
              <Award />
              საკუთარი ნამუშევარი
            </div>
          </div>
        </div>
        <section id="how" className="journey-section section-space">
          <div className="sf-shell">
            <div className="section-heading reveal">
              <div>
                <span className="eyebrow">01 / შენი სასწავლო გზა</span>
                <h2>
                  პირველი ნაბიჯიდან
                  <br />
                  <span className="muted-heading">პირველ დიდ პროექტამდე.</span>
                </h2>
              </div>
              <p>
                ტექნოლოგიების გზა: 6 თვე. სამი ეტაპი.
                <br />
                აირჩიე თვე და ნახე, რას შექმნი.
              </p>
            </div>
            <div className="journey-phases" aria-label="სწავლის ეტაპები">
              {phases.map((p, i) => (
                <button
                  className={Math.floor(month / 2) === i ? "phase active" : "phase"}
                  onClick={() => setMonth(i * 2)}
                  aria-pressed={Math.floor(month / 2) === i}
                  key={p}
                >
                  <span>0{i + 1}</span>
                  {p}
                  <small>
                    {i * 2 + 1}–{i * 2 + 2} თვე
                  </small>
                </button>
              ))}
            </div>
            <div className="journey-card">
              <div className="journey-story" key={`s${month}`}>
                <span className="month-label">
                  თვე {String(month + 1).padStart(2, "0")} <span>/ 06</span>
                </span>
                <div className="stage-icon">
                  <Icon size={27} />
                </div>
                <h3>{stage.title}</h3>
                <p>{stage.text}</p>
                <div className="stage-outcome">
                  <span className="outcome-check">
                    <Check size={15} />
                  </span>
                  <div>
                    <small>ამ თვის შედეგი</small>
                    <strong>{stage.output}</strong>
                  </div>
                </div>
                <div className="journey-arrows">
                  <button
                    disabled={month === 0}
                    onClick={() => setMonth((m) => m - 1)}
                    aria-label="წინა თვე"
                  >
                    <ArrowLeft size={18} />
                  </button>
                  <button
                    disabled={month === 5}
                    onClick={() => setMonth((m) => m + 1)}
                    aria-label="შემდეგი თვე"
                  >
                    <ArrowRight size={18} />
                  </button>
                  <span>შენი გზა, ნაბიჯ-ნაბიჯ</span>
                </div>
              </div>
              <div className={`journey-art art-${Math.floor(month / 2)}`}>
                <span className="art-grid" />
                <div className="project-preview" key={`p${month}`}>
                  <div className="preview-toolbar">
                    <span className="window-dots">
                      <i />
                      <i />
                      <i />
                    </span>
                    <small>my-first-project</small>
                    <ArrowUpRight size={13} />
                  </div>
                  <div className="preview-body">
                    <span className="preview-tag">
                      {
                        ["HELLO, WORLD", "BUILD SOMETHING", "YOUR NEXT CHAPTER"][
                          Math.floor(month / 2)
                        ]
                      }
                    </span>
                    <div className="abstract-composition">
                      <div className="shape shape-a" />
                      <div className="shape shape-b" />
                      <div className="shape shape-c" />
                      <span className="composition-icon">
                        <Icon size={44} strokeWidth={1.3} />
                      </span>
                    </div>
                    <h4>{month === 5 ? "მომავალი შენია." : "შექმენი რაღაც შენი."}</h4>
                    <div className="preview-lines">
                      <i />
                      <i />
                    </div>
                    <span className="preview-pill">
                      {phases[Math.floor(month / 2)]}
                      <ArrowUpRight size={12} />
                    </span>
                  </div>
                  <div className="code-snippet">
                    <span>01</span>
                    <code>{stage.code}</code>
                  </div>
                </div>
                <span className="cursor-label">
                  <MousePointer2 size={18} fill="currentColor" />
                  შენ
                </span>
                <div className="artifact-badge">
                  <CheckCheck size={16} />
                  {stage.output}
                </div>
                <small className="illustration-label">ვებ-დეველოპმენტის გზის მაგალითი</small>
              </div>
            </div>
            <div className="month-track" role="group" aria-label="აირჩიე სასწავლო თვე">
              {stages.map((s, i) => (
                <button
                  key={s.title}
                  aria-pressed={month === i}
                  onClick={() => setMonth(i)}
                  className={month === i ? "month-stop selected" : "month-stop"}
                >
                  <span className="track-node">
                    {i < month ? <Check size={15} /> : String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{s.title}</span>
                </button>
              ))}
            </div>
          </div>
        </section>
        <section id="catalog" className="sf-shell section-space">
          <div className="section-heading reveal">
            <div>
              <span className="eyebrow">02 / იპოვე შენი მიმართულება</span>
              <h2>
                ცნობისმოყვარეობას
                <br />
                <span className="muted-heading">პროფესიად ვაქცევთ.</span>
              </h2>
            </div>
            <p>
              ტექნოლოგიები, დიზაინი თუ ბიზნესი?
              <br />
              დაიწყე იმით, რაც გაინტერესებს.
            </p>
          </div>
          <div className="category-tabs" role="group" aria-label="კურსების კატეგორია">
            {categories.map((c) => (
              <button
                key={c.id}
                aria-pressed={cat === c.id}
                className={cat === c.id ? "selected" : ""}
                onClick={() => {
                  setCat(c.id);
                  setExpanded(false);
                }}
              >
                {c.label}
              </button>
            ))}
          </div>
          <div className="catalog-tools">
            <label className="catalog-search">
              იპოვე შენი მიმართულება
              <input
                type="search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setExpanded(false);
                }}
                placeholder="მაგალითად: დიზაინი, React, მარკეტინგი…"
              />
            </label>
            <button onClick={() => window.dispatchEvent(new CustomEvent("skillflow:guide"))}>
              <Sparkles size={16} />
              ამარჩევინე კურსი
              <ArrowUpRight size={16} />
            </button>
          </div>
          <div className="course-grid">
            {(expanded ? list : list.slice(0, 6)).map((c) => {
              const C = icons[c.category];
              return (
                <a
                  className={`course-card course-${c.category}`}
                  key={c.title}
                  href={`/courses/${c.slug}`}
                >
                  <div className="course-art">
                    <img
                      className="course-photo"
                      src={c.thumbnail}
                      alt={c.imageAlt}
                      loading="lazy"
                      width={1600}
                      height={1000}
                    />
                    <span className="course-number">
                      {String(courses.indexOf(c) + 1).padStart(2, "0")}
                    </span>

                    {c.pilot && <span className="course-new">ახალი</span>}
                    <span className="course-open">
                      <ArrowUpRight size={19} />
                    </span>
                    <span className="course-art-label">
                      {c.category === "tech"
                        ? "BUILD THE FUTURE"
                        : c.category === "design"
                          ? "MAKE IT DIFFERENT"
                          : "EXPLORE YOUR POTENTIAL"}
                    </span>
                  </div>
                  <div className="course-info">
                    <span>{categories.find((t) => t.id === c.category)?.label}</span>
                    <h3>{c.title}</h3>
                    <p className="catalog-outcome">{courseOutcomes[c.slug]?.deliverable}</p>
                    <div>
                      <span>
                        <Clock3 size={13} />
                        {c.durationMonths} თვე
                      </span>
                      <strong>
                        100 ₾ <small>/ თვე</small>
                      </strong>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
          {list.length === 0 && (
            <div className="catalog-empty" role="status">
              <p>ამ ძიებით კურსი ვერ მოიძებნა.</p>
              <button
                onClick={() => {
                  setSearch("");
                  setCat("all");
                }}
              >
                ძებნის გასუფთავება
              </button>
            </div>
          )}
          {list.length > 6 && (
            <button className="outline-button show-more" onClick={() => setExpanded(!expanded)}>
              {expanded ? "ნაკლების ჩვენება" : `ყველა კურსის ნახვა (${list.length})`}
              <ArrowRight size={16} />
            </button>
          )}
        </section>
        <section id="demo" className="mentor-section section-space">
          <div className="sf-shell explore-video-row">
            <span>შენი ახალი თავი — 15 წამში.</span>
            <PromoVideo className="explore-promo-trigger" />
          </div>
          <div className="sf-shell mentor-layout">
            <div className="mentor-copy reveal">
              <span className="eyebrow">03 / შენი AI მენტორი</span>
              <h2>
                „ვერ გავიგე“
                <br />
                ახალი დასაწყისია.
              </h2>
              <p>
                სთხოვე უფრო მარტივი ახსნა. ნახე მაგალითი. გამოცადე საკუთარი თავი. სწავლის გზა შენს
                კითხვებს მიჰყვება.
              </p>
              <div className="mentor-points">
                <span>
                  <Sparkles />
                  შენზე მორგებული განმარტება
                </span>
                <span>
                  <Code2 />
                  პრაქტიკული მაგალითები
                </span>
                <span>
                  <Clock3 />
                  ისწავლე შენს რიტმში
                </span>
              </div>
              <span className="demo-disclaimer">
                ინტერაქტიული მაგალითი · წინასწარ მომზადებული პასუხები
              </span>
            </div>
            <div className="demo-window">
              <div className="demo-header">
                <span className="mentor-avatar">
                  <Sparkles />
                </span>
                <div>
                  <strong>SkillFlow მენტორი</strong>
                  <small>React-ის საფუძვლები · დემო</small>
                </div>
                <span className="demo-status">დემო</span>
              </div>
              <div className="demo-messages" aria-live="polite">
                <div className="question-bubble" key={`q${demo}`}>
                  {demos[demo]!.q}
                </div>
                <div className="answer-bubble" key={`a${demo}`}>
                  <Sparkles size={17} />
                  <p>{demos[demo]!.a}</p>
                </div>
                <code className="demo-code">{demos[demo]!.code}</code>
              </div>
              <div className="counter-demo">
                <span>სცადე მრიცხველი</span>
                <button aria-label="მრიცხველის გაზრდა" onClick={() => setCount((c) => c + 1)}>
                  {count}
                  <span>+1</span>
                </button>
                <button className="reset-count" onClick={() => setCount(0)}>
                  განულება
                </button>
              </div>
              <div className="demo-prompts">
                {demos.map((d, i) => (
                  <button
                    key={d.label}
                    aria-pressed={demo === i}
                    className={demo === i ? "selected" : ""}
                    onClick={() => setDemo(i)}
                  >
                    {d.label}
                    <ArrowUpRight size={12} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section id="pricing" className="sf-shell section-space">
          <div className="pricing-layout">
            <div className="pricing-copy reveal">
              <span className="eyebrow">04 / ინვესტიცია საკუთარ თავში</span>
              <h2>
                დიდი ცვლილება.
                <br />
                <span className="muted-heading">მარტივი ფასი.</span>
              </h2>
              <p>
                ერთი გეგმა, მთელი სასწავლო გამოცდილება.
                <br />
                მეტი დრო განვითარებისთვის.
              </p>
              <div className="price-visual">
                <span className="price-orbit" />
                <Layers size={48} />
                <div className="price-token token-one">
                  <Code2 size={20} />
                </div>
                <div className="price-token token-two">
                  <Award size={20} />
                </div>
                <div className="price-token token-three">
                  <Sparkles size={20} />
                </div>
              </div>
            </div>
            <div className="pricing-card">
              <div className="plan-top">
                <span>შენი ახალი დასაწყისი</span>
                <span className="plan-badge">ერთი გეგმა</span>
              </div>
              <div className="price">
                100 <span>₾</span>
                <small>/ თვე</small>
              </div>
              <p>კურსის მიხედვით 2–6 თვე · ჯამში 200–600 ₾</p>
              <div className="plan-divider" />
              <ul>
                {[
                  "თვეებად დაგეგმილი სასწავლო გზა",
                  "მიმართულების შერჩევის კითხვარი",
                  "პრაქტიკული პროექტების გეგმა",
                  "პორტფოლიოსა და პროექტის კონცეფცია",
                  "მიმართულებაზე მორგებული შედეგი",
                ].map((f) => (
                  <li key={f}>
                    <Check size={17} />
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#catalog" className="sf-button">
                აირჩიე შენი მიმართულება
                <ArrowUpRight size={18} />
              </a>
              <small className="pricing-note">გაეცანი კურსს დაწყებამდე</small>
            </div>
          </div>
        </section>
        <section id="faq" className="faq-section section-space">
          <div className="sf-shell faq-layout">
            <div>
              <span className="eyebrow">კითხვები? ბუნებრივია.</span>
              <h2>
                მოდი,
                <br />
                გავარკვიოთ.
              </h2>
            </div>
            <Accordion type="single" collapsible className="faq-list">
              {faqs.map(([q, a]) => (
                <AccordionItem key={q} value={q!}>
                  <AccordionTrigger>{q}</AccordionTrigger>
                  <AccordionContent>{a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
        <section className="sf-shell final-section">
          <div className="final-cta reveal">
            <span className="eyebrow">შემდეგი ნაბიჯი შენია</span>
            <h2>
              ყველაფერი იწყება
              <br />
              ცნობისმოყვარეობით.
            </h2>
            <a href="#catalog" className="sf-button">
              იპოვე შენი კურსი
              <ArrowUpRight size={18} />
            </a>
            <div className="cta-graphic" aria-hidden="true">
              <Layers size={110} strokeWidth={0.8} />
            </div>
          </div>
        </section>
      </main>
      <CareerAssistant />
      <footer className="sf-shell sf-footer">
        <a href="/" className="wordmark">
          <span className="brand-symbol">
            <Layers size={19} />
          </span>
          SkillFlow<span className="ai-label">AI</span>
        </a>
        <span>შენი მომავლისთვის შექმნილი.</span>
        <small>© 2026 SkillFlow AI · თბილისი</small>
      </footer>
      <Dialog
        open={selected !== null}
        onOpenChange={(o) => {
          if (!o) setSelected(null);
        }}
      >
        <DialogContent className="course-dialog">
          <DialogHeader>
            <span className="eyebrow">შენი შემდეგი ნაბიჯი</span>
            <DialogTitle>{selected}</DialogTitle>
            <DialogDescription>სასწავლო გზა · 100 ₾ თვეში</DialogDescription>
          </DialogHeader>
          <div className="dialog-stages">
            {[
              "საფუძვლები და ინსტრუმენტები",
              "პრაქტიკა და პროექტები",
              "პორტფოლიოსა და პროექტის კონცეფცია",
            ].map((s, i) => (
              <div key={s}>
                <span>0{i + 1}</span>
                {s}
                <Check size={16} />
              </div>
            ))}
          </div>
          <p className="dialog-note">
            ეს არის პროგრამის გაცნობის ვერსია. რეგისტრაცია და გადახდა ჯერ არ არის ჩართული.
          </p>
          <button
            className="outline-button"
            onClick={() => {
              const course = selected;
              setSelected(null);
              window.setTimeout(
                () =>
                  window.dispatchEvent(new CustomEvent("skillflow:guide", { detail: { course } })),
                100,
              );
            }}
          >
            <Sparkles size={16} /> ამ კურსზე ჰკითხე მეგზურს
          </button>
          <a
            className="sf-button"
            href="#how"
            onClick={() => {
              setSelected(null);
              setMonth(0);
            }}
          >
            ნახე სასწავლო გზის მაგალითი
            <ArrowRight size={17} />
          </a>
        </DialogContent>
      </Dialog>
    </div>
  );
}
