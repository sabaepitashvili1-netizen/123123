import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, BookOpen, Check, Clock3, Layers, Sparkles } from "lucide-react";
import { findCourse, categories, monthlyPrice, totalCoursePrice } from "@/content/catalog";
import { CareerAssistant } from "@/components/career-assistant";
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
  return (
    <div className="course-page">
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
                <Sparkles size={16} />
                AI მხარდაჭერა
              </span>
            </div>
          </div>
        </section>
        <div className="course-page-body">
          <section>
            <span className="eyebrow">შენი ახალი გამოცდილება</span>
            <h2>
              ცოდნა, რომელსაც
              <br />
              მოქმედებაში გადაიყვან.
            </h2>
            <p className="course-page-intro">
              საფუძვლებიდან პრაქტიკამდე — შეისწავლე თემები, გამოცადე ცოდნა და იმუშავე საკუთარ
              ნამუშევარზე.
            </p>
            <div className="course-topic-list">
              {course.topics.map((topic, i) => (
                <div key={topic}>
                  <span>0{i + 1}</span>
                  <div>
                    <h3>{topic}</h3>
                    <p>
                      {
                        [
                          "გაიცანი პრინციპები და მოამზადე სამუშაო გარემო.",
                          "გამოცადე ნასწავლი მაგალითებითა და დავალებებით.",
                          "შეაერთე ცოდნა პრაქტიკულ ნამუშევარში.",
                        ][i]
                      }
                    </p>
                  </div>
                  <Check size={18} />
                </div>
              ))}
            </div>
            {course.category === "content" && (
              <p className="course-level-note">
                ენის კურსი ორთვიანი მოდულია და საწყის დონეს ერგება; ყველა დონის ერთდროულად გავლას არ
                გულისხმობს.
              </p>
            )}
            <a className="course-back-link" href="/explore#catalog">
              <ArrowLeft size={16} />
              სხვა მიმართულებების ნახვა
            </a>
          </section>
          <aside className="course-price-panel">
            <span className="eyebrow">შენი სასწავლო გეგმა</span>
            <div className="course-monthly">
              {monthlyPrice} ₾<small>/ თვე</small>
            </div>
            <p>
              {course.durationMonths} თვე · ჯამში {totalCoursePrice(course)} ₾
            </p>
            <ul>
              {[
                "პრაქტიკული თემები და დავალებები",
                "მენტორის დახმარება სწავლისას",
                "შენი ცოდნის პრაქტიკაში გამოცდა",
              ].map((s) => (
                <li key={s}>
                  <Check size={16} />
                  {s}
                </li>
              ))}
            </ul>
            <button
              className="sf-button"
              onClick={() =>
                window.dispatchEvent(
                  new CustomEvent("skillflow:guide", { detail: { course: course.title } }),
                )
              }
            >
              კურსზე ჰკითხე მეგზურს
              <Sparkles size={17} />
            </button>
            <a href="/explore#how">
              როგორ მუშაობს სწავლა
              <ArrowUpRight size={14} />
            </a>
            <small>რეგისტრაცია და გადახდა ამ ვერსიაში ჯერ არ არის ჩართული.</small>
          </aside>
        </div>
      </main>
      <CareerAssistant />
      <footer className="course-page-footer">SkillFlow AI · შენი შემდეგი ნაბიჯისთვის.</footer>
    </div>
  );
}
