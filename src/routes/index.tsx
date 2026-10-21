import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  Layers,
  Sparkles,
  Play,
  Pause,
  Code2,
  Check,
  BookOpen,
  Award,
  Compass,
  Menu,
  Volume2,
  Terminal,
  Folder,
  Plus,
  X,
} from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { CareerAssistant } from "@/components/career-assistant";
import { categories, courses, courseByTitle, type Category } from "@/content/catalog";
import { PromoVideo } from "@/components/promo-video";
import "@/home.css";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SkillFlow AI — შენი მომავალი იწყება აქ" },
      {
        name: "description",
        content:
          "აღმოაჩინე პროფესია, ისწავლე AI მენტორთან და შექმენი შენი პირველი პროექტი. 2–6 თვე, 100 ₾ თვეში.",
      },
    ],
  }),
  component: Home,
});
const scenes = [
  {
    label: "ისწავლე",
    subtitle: "შენი AI მენტორი",
    eyebrow: "ახალი პროფესია. სრულიად ახალი გამოცდილება.",
    title: (
      <>
        შენი მომავალი.
        <br />
        <span>შენი ტემპით.</span>
      </>
    ),
    description: "შედი შენს სასწავლო სივრცეში. ისწავლე, შექმენი და აღმოაჩინე, რა შეგიძლია.",
    icon: BookOpen,
    detail: "AI მენტორი · ახსნა შენი ტემპით",
  },
  {
    label: "შექმენი",
    subtitle: "ცოდნა მოქმედებაში",
    eyebrow: "ნაკლები თეორია. მეტი „მე შევძელი“.",
    title: (
      <>
        იდეა შენია.
        <br />
        <span>შექმენიც შენ.</span>
      </>
    ),
    description: "პირველი ხაზიდან პირველ პროექტამდე. აქ ცოდნა ხელშესახებ გამოცდილებად იქცევა.",
    icon: Code2,
    detail: "პრაქტიკა · პროექტები · უკუკავშირი",
  },
  {
    label: "გაიზარდე",
    subtitle: "შენი შემდეგი ნაბიჯი",
    eyebrow: "შენი უნარები. შენი ახალი შესაძლებლობები.",
    title: (
      <>
        აჩვენე სამყაროს,
        <br />
        <span>რა შეგიძლია.</span>
      </>
    ),
    description: "შეკრიბე შენი ნამუშევრები. შექმენი პორტფოლიო და გადადგი შემდეგი ნაბიჯი.",
    icon: Award,
    detail: "პორტფოლიო · ფინალური პროექტი",
  },
];
function Home() {
  const [scene, setScene] = useState(0),
    [catalog, setCatalog] = useState(false),
    [cat, setCat] = useState<Category | "all">("all"),
    [chosen, setChosen] = useState<string | null>(null),
    [menu, setMenu] = useState(false),
    [count, setCount] = useState(0);
  const current = scenes[scene]!;
  const chosenCourse = courseByTitle(chosen);
  function showGuide(course?: string) {
    setCatalog(false);
    setMenu(false);
    window.setTimeout(
      () => window.dispatchEvent(new CustomEvent("skillflow:guide", { detail: { course } })),
      80,
    );
  }
  function changeScene(next: number) {
    setScene(next);
  }
  return (
    <div className={`sf-cinema scene-${scene}`}>
      <a href="#cinema-main" className="skip-link">
        მთავარ შინაარსზე გადასვლა
      </a>
      <div className="cinema-atmosphere" aria-hidden="true">
        <div />
        <div />
        <span>YOUR NEXT CHAPTER</span>
      </div>
      <header className="cinema-header">
        <a href="/" className="cinema-brand" aria-label="SkillFlow AI მთავარი">
          <span>
            <Layers size={22} />
          </span>
          SkillFlow<small>AI</small>
        </a>
        <nav className="cinema-nav" aria-label="მთავარი ნავიგაცია">
          <button
            onClick={() => {
              setCatalog(true);
              setChosen(null);
            }}
          >
            კურსები
          </button>
          <a href="/explore#how">სასწავლო გზა</a>
          <a href="/explore#pricing">ფასი</a>
        </nav>
        <div className="cinema-header-end">
          <span className="cinema-fee">
            100 ₾<small>/ თვე</small>
          </span>
          <button className="cinema-guide" onClick={() => showGuide()}>
            <Sparkles size={15} />
            <span>იპოვე შენი გზა</span>
            <ArrowUpRight size={14} />
          </button>
          <button className="cinema-menu" aria-label="მენიუს გახსნა" onClick={() => setMenu(true)}>
            <Menu size={22} />
          </button>
        </div>
      </header>
      <main id="cinema-main" className="cinema-main">
        <div className="cinema-copy" key={`copy-${scene}`}>
          <span className="cinema-eyebrow">
            <i />
            {current.eyebrow}
          </span>
          <h1>{current.title}</h1>
          <p>{current.description}</p>
          <div className="cinema-actions">
            <button
              className="cinema-primary"
              onClick={() => {
                setCatalog(true);
                setChosen(null);
              }}
            >
              აღმოაჩინე კურსები
              <ArrowUpRight size={18} />
            </button>
            <button className="cinema-secondary" onClick={() => showGuide()}>
              <Compass size={17} />
              <span>ჯერ არ აგირჩევია?</span>
            </button>
          </div>
          <div className="cinema-proof">
            <span>
              <Check size={13} />
              2–6 თვე
            </span>
            <i />
            <span>
              <Check size={13} />
              შენი განრიგით
            </span>
          </div>
        </div>
        <div className="cinema-visual" aria-label="სწავლის გამოცდილების ინტერაქტიული ნიმუში">
          <div className="stage-halo" />
          <div className="stage-ring ring-a" />
          <div className="stage-ring ring-b" />
          <div className="cinema-stage" key={`stage-${scene}`}>
            <div className="stage-float float-top">
              <span className="float-icon">
                <current.icon size={18} />
              </span>
              <div>
                <small>შენი შემდეგი ნაბიჯი</small>
                <strong>
                  {scene === 0
                    ? "გაიგე. სცადე. აღმოაჩინე."
                    : scene === 1
                      ? "შენი იდეა ცოცხლდება."
                      : "ყველაფერი შენ შექმენი."}
                </strong>
              </div>
              <span className="float-orbit" />
            </div>
            <div className="product-device">
              <div className="device-top">
                <a href="/explore" className="device-wordmark">
                  <Layers size={13} />
                  SkillFlow
                </a>
                <span>
                  <i />
                  შენი სასწავლო სივრცე
                </span>
                <div className="device-dots">
                  <i />
                  <i />
                  <i />
                </div>
              </div>
              <div className="device-body">
                <aside className="device-sidebar" aria-hidden="true">
                  <span className={scene === 0 ? "active" : ""}>
                    <BookOpen size={17} />
                  </span>
                  <span className={scene === 1 ? "active" : ""}>
                    <Code2 size={17} />
                  </span>
                  <span className={scene === 2 ? "active" : ""}>
                    <Folder size={17} />
                  </span>
                  <span>
                    <Award size={17} />
                  </span>
                  <span className="sidebar-spark">
                    <Sparkles size={17} />
                  </span>
                </aside>
                <div className="device-content">
                  {scene === 0 ? (
                    <div className="learn-scene">
                      <div className="device-section-title">
                        <span>მოდული 01</span>
                        <span className="concept-tag">ვიზუალური დემო</span>
                      </div>
                      <h2>
                        დიდი იდეები.
                        <br />
                        პატარა ნაბიჯებით.
                      </h2>
                      <div className="lesson-view promo-poster-view">
                        <img
                          src="/media/skillflow-mentor-cover.jpg"
                          alt="SkillFlow-ის მოკლე ტექნოლოგიური ფილმის კადრი"
                        />
                        <span className="lesson-live">
                          <Sparkles size={11} />
                          შენი AI მენტორი
                        </span>
                        <PromoVideo className="scene-play" />
                        <span className="lesson-live-caption">
                          შენი მომავალი იწყება დღეს · 15 წამი
                        </span>
                      </div>
                      <div className="lesson-progress">
                        <span>პირველი ნაბიჯი</span>
                        <div>
                          <i />
                        </div>
                        <small>01 / 06</small>
                      </div>
                    </div>
                  ) : scene === 1 ? (
                    <div className="build-scene">
                      <div className="device-section-title">
                        <span>შენი სამუშაო სივრცე</span>
                        <span className="concept-tag">სცადე ღილაკი +</span>
                      </div>
                      <h2>
                        ნასწავლი.
                        <br />
                        ახლა მოქმედებაში.
                      </h2>
                      <div className="editor-preview">
                        <div className="editor-tab">
                          <Code2 size={12} />
                          my-first-app.tsx<span>●</span>
                        </div>
                        <div className="editor-code">
                          <span>
                            <i>01</i>
                            <em>const</em> [count, setCount]
                          </span>
                          <span>
                            <i>02</i> = useState(<b>0</b>);
                          </span>
                          <span>
                            <i>03</i>
                          </span>
                          <span>
                            <i>04</i>
                            <em>return</em> (
                          </span>
                          <span>
                            <i>05</i> &lt;<b>YourNextIdea</b> /&gt;
                          </span>
                          <span>
                            <i>06</i>);
                          </span>
                        </div>
                        <div className="interactive-preview">
                          <span className="mini-grid" />
                          <small>შენი პირველი ინტერაქცია</small>
                          <div>
                            <strong aria-live="polite">{count.toString().padStart(2, "0")}</strong>
                            <button
                              onClick={() => setCount((c) => c + 1)}
                              aria-label="პროექტის მრიცხველის გაზრდა"
                            >
                              <Plus size={21} />
                            </button>
                          </div>
                          <span>იდეიდან მოქმედებამდე.</span>
                        </div>
                      </div>
                      <div className="build-status">
                        <i />
                        <span>შენ ქმნი. შენ სწავლობ.</span>
                        <Terminal size={13} />
                      </div>
                    </div>
                  ) : (
                    <div className="portfolio-scene">
                      <div className="device-section-title">
                        <span>შენი პორტფოლიო</span>
                        <span className="concept-tag">ვიზუალური ნიმუში</span>
                      </div>
                      <h2>
                        ეს ყველაფერი
                        <br />
                        შენ შეგიძლია.
                      </h2>
                      <div className="portfolio-intro">
                        <div>
                          <span>გამარჯობა, მე ვარ</span>
                          <strong>მომავლის შემქმნელი.</strong>
                        </div>
                        <div className="portfolio-avatar">
                          <Sparkles size={23} />
                        </div>
                      </div>
                      <div className="portfolio-projects">
                        {[Code2, Layers, Compass].map((I, i) => (
                          <div key={i} className={`portfolio-project project-${i}`}>
                            <div>
                              <I size={30} strokeWidth={1.3} />
                              <span />
                            </div>
                            <small>პროექტი 0{i + 1}</small>
                            <ArrowUpRight size={12} />
                          </div>
                        ))}
                      </div>
                      <div className="portfolio-complete">
                        <span>
                          <Check size={15} />
                        </span>
                        <div>
                          <strong>შენი ახალი თავი.</strong>
                          <small>პორტფოლიო + ფინალური პროექტი</small>
                        </div>
                        <Award size={25} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="device-bottom">
                <span>
                  <i />
                  LEARN. BUILD. BECOME.
                </span>
                <span>SkillFlow AI</span>
              </div>
            </div>
            <div className="stage-float float-bottom">
              <span className="float-check">
                <Check size={16} />
              </span>
              <div>
                <strong>
                  {scene === 0
                    ? "რთული კითხვა? ერთად გავარკვიოთ."
                    : scene === 1
                      ? "პირველი ინტერაქცია უკვე მუშაობს."
                      : "მზადაა შენი შემდეგი ნაბიჯისთვის."}
                </strong>
                <small>
                  {scene === 0
                    ? "ახსნა → მაგალითი → შენი აღმოჩენა"
                    : scene === 1
                      ? "სცადე + ღილაკი სასწავლო სივრცეში"
                      : "შენი ნამუშევრები ერთ სივრცეში"}
                </small>
              </div>
              {scene === 2 ? (
                <Award size={24} />
              ) : (
                <div className="float-bars">
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
              )}
            </div>
          </div>
          <div className="visual-description">
            <span className="visual-caption-dot" />
            {current.detail}
            <span>0{scene + 1} / 03</span>
          </div>
        </div>
        <div className="cinema-mobile-actions">
          <button
            className="cinema-primary"
            onClick={() => {
              setCatalog(true);
              setChosen(null);
            }}
          >
            აღმოაჩინე კურსები
            <ArrowUpRight size={17} />
          </button>
          <button
            className="cinema-mobile-guide"
            aria-label="პროფესიის შერჩევის მეგზურის გახსნა"
            onClick={() => showGuide()}
          >
            <Sparkles size={20} />
          </button>
        </div>
      </main>
      <footer className="cinema-footer">
        <span className="cinema-footer-note">შენი ახალი გამოცდილება</span>
        <div className="scene-selector" role="group" aria-label="სწავლის გამოცდილების რეჟიმი">
          {scenes.map((s, i) => (
            <button
              key={s.label}
              className={scene === i ? "active" : ""}
              aria-pressed={scene === i}
              onClick={() => changeScene(i)}
            >
              <span className="scene-number">0{i + 1}</span>
              <s.icon size={19} />
              <span>
                <strong>{s.label}</strong>
                <small>{s.subtitle}</small>
              </span>
              <ArrowUpRight className="scene-arrow" size={16} />
            </button>
          ))}
        </div>
        <a href="/explore" className="cinema-explore-link">
          მეტი შესაძლებლობა
          <ArrowUpRight size={15} />
        </a>
      </footer>
      <CareerAssistant />
      <Dialog open={catalog} onOpenChange={setCatalog}>
        <DialogContent className="cinema-catalog">
          <DialogTitle>{chosen ?? "რომელი გზა იქნება შენი?"}</DialogTitle>
          <DialogDescription>
            {chosen
              ? `${chosenCourse?.durationMonths} თვე · 100 ₾ / თვე`
              : "აღმოაჩინე მიმართულება ან სთხოვე მეგზურს დახმარება."}
          </DialogDescription>
          {chosen ? (
            <div className="cinema-course-detail">
              <div className="course-detail-art">
                <img src={chosenCourse?.image} alt={chosenCourse?.imageAlt} />
                <span>შენი ახალი დასაწყისი</span>
              </div>
              <div className="course-detail-steps">
                {[
                  "საფუძვლები და პრაქტიკა",
                  "პროექტები და უკუკავშირი",
                  "პორტფოლიო და ფინალური პროექტი",
                ].map((s, i) => (
                  <div key={s}>
                    <span>0{i + 1}</span>
                    {s}
                    <Check size={15} />
                  </div>
                ))}
              </div>
              <button className="cinema-primary" onClick={() => showGuide(chosen)}>
                ამ კურსზე ჰკითხე მეგზურს
                <Sparkles size={16} />
              </button>
              <a className="cinema-detail-link" href="/explore#how">
                გაიცანი სასწავლო გზა
                <ArrowUpRight size={15} />
              </a>
              <button className="cinema-back" onClick={() => setChosen(null)}>
                <ArrowLeft size={14} />
                ყველა კურსი
              </button>
            </div>
          ) : (
            <>
              <div className="cinema-categories" role="group" aria-label="კურსების მიმართულებები">
                {categories.map((c) => (
                  <button
                    aria-pressed={cat === c.id}
                    className={cat === c.id ? "active" : ""}
                    key={c.id}
                    onClick={() => setCat(c.id)}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
              <div className="cinema-course-list">
                {courses
                  .filter((c) => cat === "all" || cat === c.category)
                  .map((c, i) => (
                    <a key={c.title} href={`/courses/${c.slug}`}>
                      <img
                        className="catalog-course-thumb"
                        src={c.thumbnail}
                        alt={c.imageAlt}
                        loading="lazy"
                        width={108}
                        height={76}
                      />
                      <span>{String(i + 1).padStart(2, "0")}</span>
                      <div>
                        <strong>{c.title}</strong>
                        <small>{c.durationMonths} თვე · 100 ₾ / თვე</small>
                      </div>
                      <ArrowUpRight size={18} />
                    </a>
                  ))}
              </div>
              <button className="cinema-catalog-guide" onClick={() => showGuide()}>
                <Sparkles size={16} />
                არჩევანში მეგზური დაგეხმარება
                <ArrowRight size={16} />
              </button>
            </>
          )}
        </DialogContent>
      </Dialog>
      <Dialog open={menu} onOpenChange={setMenu}>
        <DialogContent className="cinema-menu-dialog">
          <DialogTitle>შენი შემდეგი ნაბიჯი</DialogTitle>
          <DialogDescription>აღმოაჩინე SkillFlow</DialogDescription>
          <button
            onClick={() => {
              setMenu(false);
              setCatalog(true);
              setChosen(null);
            }}
          >
            კურსები
            <ArrowUpRight />
          </button>
          <a href="/explore#how">
            სასწავლო გზა
            <ArrowUpRight />
          </a>
          <a href="/explore#pricing">
            ფასი
            <ArrowUpRight />
          </a>
          <a href="/explore#faq">
            ხშირი კითხვები
            <ArrowUpRight />
          </a>
          <button onClick={() => showGuide()}>
            პროფესიის მეგზური
            <Sparkles />
          </button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
