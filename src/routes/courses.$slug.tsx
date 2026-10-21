import { useState } from "react";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, BookOpen, Check, Clock3, Layers, Sparkles } from "lucide-react";
import { findCourse, categories, monthlyPrice, totalCoursePrice } from "@/content/catalog";
import { CareerAssistant } from "@/components/career-assistant";
import { CourseApplication } from "@/components/course-application";
import { courseExperience } from "@/content/course-experience";
import { ArrowRight, ShieldCheck, Target, Laptop, ChevronDown } from "lucide-react";
import "@/premium.css";
export const Route = createFileRoute("/courses/$slug")({
  loader: ({ params }) => {
    const course = findCourse(params.slug);
    if (!course) throw notFound();
    return course;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.title} — SkillFlow AI` : "კურსი — SkillFlow AI" },
      { name: "description", content: loaderData?.description ?? "აირჩიე შენი ახალი მიმართულება." },
    ],
  }),
  component: CoursePage,
});
function CoursePage() {
  const course = Route.useLoaderData();
  const { outcome, audience, preparation, months } = courseExperience(course);
  const [application, setApplication] = useState(false);
  const [weeklyHours, setWeeklyHours] = useState(5);
  return (
    <div className="course-page premium-course">
      <header className="course-page-header">
        <a href="/" className="wordmark">
          <span className="brand-symbol">
            <Layers size={20} />
          </span>
          SkillFlow<span className="ai-label">AI</span>
        </a>
        <a href="/explore#catalog">
          <ArrowLeft size={15} />
          ყველა კურსი
        </a>
      </header>
      <main>
        <section className="course-photo-hero">
          <img src={course.image} alt={course.imageAlt} fetchPriority="high" />
          <div className="course-hero-shade" />
          <div className="course-hero-copy">
            <span>{categories.find((c) => c.id === course.category)?.label}</span>
            <h1>{course.title}</h1>
            <p>{course.description}</p>
            <div>
              <span>
                <Clock3 size={16} />
                {course.durationMonths} თვე
              </span>
              <span>
                <BookOpen size={16} />
                პრაქტიკული სწავლა
              </span>
              <span>
                <Target size={16} />
                საკუთარი ნამუშევარი
              </span>
            </div>
          </div>
          <a className="hero-discover" href="#outcome">
            ნახე, რას შექმნი
            <ArrowRight size={18} />
          </a>
        </section>
        <nav className="course-section-nav" aria-label="კურსის სექციები">
          <a href="#outcome">შედეგი</a>
          <a href="#curriculum">სასწავლო გეგმა</a>
          <a href="#fit">ვისთვისაა</a>
          <a href="#course-faq">კითხვები</a>
          <button onClick={() => setApplication(true)}>
            დაიწყე აქ
            <ArrowUpRight size={15} />
          </button>
        </nav>
        <div className="course-page-body">
          <div className="course-story">
            <section id="outcome" className="outcome-section">
              <span className="eyebrow">მიზანი თვალწინ გაქვს</span>
              <h2>{outcome.title}</h2>
              <p className="course-page-intro">{outcome.deliverable}</p>
              <div className={`outcome-showcase outcome-${course.category}`}>
                <div className="showcase-top">
                  <span>
                    <i />
                    <i />
                    <i />
                  </span>
                  <small>YOUR NEXT CREATION</small>
                  <ArrowUpRight size={15} />
                </div>
                <div className="showcase-content">
                  <div>
                    <span className="showcase-kicker">იდეა → პრაქტიკა → ნამუშევარი</span>
                    <h3>{outcome.title}</h3>
                    <p>{outcome.tools}</p>
                    <span className="showcase-pill">
                      <Check size={13} />
                      შექმნილია შენს მიერ
                    </span>
                  </div>
                  <div className="showcase-art">
                    <img src={course.thumbnail} alt={course.imageAlt} loading="lazy" />
                    <div className="showcase-stamp">
                      <Layers size={26} />
                      <span>
                        MAKE IT
                        <br />
                        YOUR OWN.
                      </span>
                    </div>
                  </div>
                </div>
                <div className="showcase-bottom">
                  <span>SKILLFLOW / PROJECT CONCEPT</span>
                  <span>01 — {String(course.durationMonths).padStart(2, "0")}</span>
                </div>
              </div>
              <p className="concept-disclosure">
                სასწავლო შედეგის ვიზუალური კონცეფცია. ნამუშევარს კურსის განმავლობაში თავად ქმნი;
                შედეგი შენს პრაქტიკასა და ჩართულობაზეა დამოკიდებული.
              </p>
            </section>
            <section id="curriculum" className="curriculum-section">
              <div className="section-heading-row">
                <div>
                  <span className="eyebrow">ნაბიჯები შენი მიზნისკენ</span>
                  <h2>
                    {course.durationMonths} თვე.
                    <br />
                    ერთი ახალი მიმართულება.
                  </h2>
                </div>
                <span className="duration-seal">
                  <strong>{String(course.durationMonths).padStart(2, "0")}</strong>თვე
                </span>
              </div>
              <p className="course-page-intro">
                საორიენტაციო გზა — საფუძვლებიდან საკუთარი ნამუშევრის წარდგენამდე.
              </p>
              <div className="curriculum-list">
                {months.map((month, i) => (
                  <details key={i} open={i === 0}>
                    <summary>
                      <span className="month-index">{String(i + 1).padStart(2, "0")}</span>
                      <span>
                        <small>თვე {i + 1}</small>
                        <strong>{month.title}</strong>
                      </span>
                      <ChevronDown size={18} />
                    </summary>
                    <div>
                      <h3>{month.topic}</h3>
                      <p>{month.detail}</p>
                      <span>
                        <BookOpen size={14} />
                        გაიგე
                        <ArrowRight size={13} />
                        სცადე
                        <ArrowRight size={13} />
                        შექმენი
                      </span>
                    </div>
                  </details>
                ))}
              </div>
            </section>
            <section id="fit" className="course-fit-section">
              <span className="eyebrow">იპოვე შენი საწყისი წერტილი</span>
              <h2>შენი ადგილია, თუ…</h2>
              <div className="fit-grid">
                <article>
                  <Target size={24} />
                  <h3>ეს გაინტერესებს</h3>
                  <p>{audience}</p>
                </article>
                <article>
                  <Laptop size={24} />
                  <h3>დასაწყებად გჭირდება</h3>
                  <p>{preparation}</p>
                </article>
              </div>
              <div className="study-planner">
                <div>
                  <span className="eyebrow">მოარგე შენს კვირას</span>
                  <h3>პატარა დრო. რეგულარული ნაბიჯები.</h3>
                  <p>ეს შენი დროის დამგეგმავია — საათების შეცვლა კურსის ხანგრძლივობას არ ცვლის.</p>
                </div>
                <div className="planner-control">
                  <label htmlFor="study-hours">
                    <strong>{weeklyHours}</strong> საათი / კვირა
                  </label>
                  <input
                    id="study-hours"
                    type="range"
                    min={2}
                    max={10}
                    value={weeklyHours}
                    onChange={(e) => setWeeklyHours(Number(e.target.value))}
                  />
                  <p aria-live="polite">
                    დაახლოებით {Math.round((weeklyHours * 60) / 5)} წუთი, კვირაში 5 დღე
                  </p>
                </div>
              </div>
              {["english", "german"].includes(course.slug) && (
                <p className="course-level-note">
                  ენების ორთვიანი კურსი ერთ სასწავლო მოდულს მოიცავს. საწყისი დონე ინდივიდუალურად
                  დასაზუსტებელია; ორ თვეში თავისუფალ ფლობას არ ვპირდებით.
                </p>
              )}
            </section>
            <section className="course-trust-section">
              <span className="eyebrow">გაიგე, რას ირჩევ</span>
              <h2>
                მკაფიო პირობები.
                <br />
                მეტი თავდაჯერება.
              </h2>
              <div className="trust-rows">
                <article>
                  <ShieldCheck size={23} />
                  <div>
                    <h3>ფასი თავიდანვე იცი</h3>
                    <p>
                      {monthlyPrice} ₾ თვეში · {course.durationMonths} თვე · სრული გეგმა{" "}
                      {totalCoursePrice(course)} ₾. განაცხადის გაგზავნა უფასოა.
                    </p>
                  </div>
                </article>
                <article>
                  <Sparkles size={23} />
                  <div>
                    <h3>AI — დამხმარე სწავლისას</h3>
                    <p>
                      მიმართულების კითხვარი უკვე მუშაობს. თავისუფალი AI ჩატის გააქტიურება მზადდება.
                      AI პასუხები გადამოწმებას საჭიროებს.
                    </p>
                  </div>
                </article>
                <article>
                  <BookOpen size={23} />
                  <div>
                    <h3>ნამდვილი მოლოდინი</h3>
                    <p>
                      სასწავლო გზა და პროექტები საორიენტაციო გეგმაა. დაწყების თარიღი, მასალები და
                      მხარდაჭერის ფორმატი ჩარიცხვამდე უნდა დაზუსტდეს.
                    </p>
                  </div>
                </article>
              </div>
            </section>
            <section id="course-faq" className="course-faq">
              <span className="eyebrow">სანამ პირველ ნაბიჯს გადადგამ</span>
              <h2>შენი კითხვები.</h2>
              {[
                [
                  "დამწყებისთვის შესაფერისია?",
                  "გეგმა საფუძვლებით იწყება. თუ არჩევანში ეჭვი გეპარება, გამოიყენე სამკითხვიანი მეგზური; კონკრეტული კურსის წინაპირობები ჩარიცხვამდე დააზუსტე.",
                ],
                [
                  "როგორ მუშაობს განაცხადი?",
                  "ტოვებ სახელს, ელფოსტას და სურვილის შემთხვევაში ტელეფონს. განაცხადი ინახება არჩეულ კურსთან ერთად. ეს ჯერ ანგარიშის შექმნას, გადახდას ან ჩარიცხვას არ ნიშნავს.",
                ],
                [
                  "როდის იწყება სწავლა?",
                  "დაწყების თარიღი ამ ეტაპზე გამოცხადებული არ არის. შეგიძლია დააფიქსირო ინტერესი; ჩარიცხვამდე პროგრამის პირობები ცალკე უნდა დადასტურდეს.",
                ],
                [
                  "რას მივიღებ დასრულებისას?",
                  outcome.deliverable + " საიტი არ იძლევა დასაქმების ან შემოსავლის გარანტიას.",
                ],
              ].map(([q, a]) => (
                <details key={q}>
                  <summary>
                    {q}
                    <ChevronDown size={18} />
                  </summary>
                  <p>{a}</p>
                </details>
              ))}
            </section>
            <a className="course-back-link" href="/explore#catalog">
              <ArrowLeft size={16} />
              სხვა მიმართულებების ნახვა
            </a>
          </div>
          <aside className="course-price-panel">
            <span className="eyebrow">შენი ახალი დასაწყისი</span>
            <div className="course-monthly">
              {monthlyPrice} ₾<small>/ თვე</small>
            </div>
            <p>
              {course.durationMonths} თვე · ჯამში {totalCoursePrice(course)} ₾
            </p>
            <div className="price-divider" />
            <ul>
              {[
                "საკუთარი პრაქტიკული ნამუშევარი",
                `${course.durationMonths}-თვიანი სასწავლო გზა`,
                "სწავლისა და პრაქტიკის კომბინაცია",
              ].map((s) => (
                <li key={s}>
                  <Check size={16} />
                  {s}
                </li>
              ))}
            </ul>
            <button className="sf-button" onClick={() => setApplication(true)}>
              მინდა ამ კურსზე
              <ArrowUpRight size={18} />
            </button>
            <button
              className="course-guide-link"
              onClick={() =>
                window.dispatchEvent(
                  new CustomEvent("skillflow:guide", { detail: { course: course.title } }),
                )
              }
            >
              <Sparkles size={16} />
              კურსზე ჰკითხე მეგზურს
            </button>
            <small>
              <ShieldCheck size={14} />
              უფასო განაცხადი · გადახდის გარეშე
            </small>
          </aside>
        </div>
        <section className="course-final-cta">
          <span className="eyebrow">დიდი ცვლილება პატარა ნაბიჯით იწყება</span>
          <h2>
            შემდეგი ნამუშევარი
            <br />
            <em>შეიძლება შენი იყოს.</em>
          </h2>
          <button className="sf-button" onClick={() => setApplication(true)}>
            გადადგი პირველი ნაბიჯი
            <ArrowUpRight size={19} />
          </button>
        </section>
      </main>
      <div className="course-mobile-bar">
        <span>
          <strong>{monthlyPrice} ₾</strong> / თვე
          <small>
            {course.durationMonths} თვე · {totalCoursePrice(course)} ₾ ჯამში
          </small>
        </span>
        <button className="sf-button" onClick={() => setApplication(true)}>
          დაიწყე აქ
          <ArrowUpRight size={17} />
        </button>
      </div>
      <CourseApplication
        key={course.slug}
        course={course}
        open={application}
        onOpenChange={setApplication}
      />
      <CareerAssistant />
      <footer className="course-page-footer">SkillFlow AI · ცოდნა, რომელსაც ქმნი.</footer>
    </div>
  );
}
