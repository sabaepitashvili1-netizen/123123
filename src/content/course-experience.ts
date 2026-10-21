import type { Course } from "./catalog";

export const courseOutcomes: Record<string, { title: string; deliverable: string; tools: string }> =
  {
    fullstack: {
      title: "შენი პირველი ვებპროდუქტი",
      deliverable: "ვებაპლიკაცია ინტერფეისით, სერვერითა და მონაცემთა ბაზით.",
      tools: "JavaScript · React · API",
    },
    frontend: {
      title: "იდეა, რომელიც ეკრანზე ცოცხლდება",
      deliverable: "ადაპტირებული ვებსაიტი ინტერაქტიული კომპონენტებით.",
      tools: "HTML · CSS · JavaScript · React",
    },
    backend: {
      title: "ლოგიკა, რომელიც პროდუქტს ამუშავებს",
      deliverable: "დოკუმენტირებული API მონაცემთა ბაზითა და წვდომის მართვით.",
      tools: "API · Database · Testing",
    },
    "ai-engineering": {
      title: "შენი AI ინსტრუმენტის პროტოტიპი",
      deliverable: "AI-ზე დაფუძნებული მცირე აპლიკაცია კონკრეტული ამოცანისთვის.",
      tools: "AI models · Prompting · API",
    },
    "data-science": {
      title: "მონაცემები, რომლებიც ამბავს ჰყვება",
      deliverable: "მონაცემების ანალიზი, ვიზუალიზაცია და მიგნებების პრეზენტაცია.",
      tools: "Data · Analysis · Visualization",
    },
    cybersecurity: {
      title: "უფრო დაცული ციფრული გარემო",
      deliverable: "სასწავლო გარემოს რისკების შეფასება და დაცვის სამოქმედო გეგმა.",
      tools: "Networks · Risk · Security",
    },
    "devops-cloud": {
      title: "პროდუქტი — შენს ეკრანს მიღმა",
      deliverable: "სატესტო აპლიკაციის განთავსება და განახლების ავტომატიზაცია.",
      tools: "Linux · Automation · Cloud",
    },
    "ui-ux": {
      title: "გამოცდილება, რომელიც მარტივად მუშაობს",
      deliverable: "აპლიკაციის ინტერაქტიული პროტოტიპი და დიზაინის გადაწყვეტილებების ახსნა.",
      tools: "Research · Wireframes · Prototype",
    },
    "graphic-design": {
      title: "ბრენდი საკუთარი ხასიათით",
      deliverable: "ვიზუალური იდენტობის კონცეფცია: ფერი, ტიპოგრაფია და გამოყენების ნიმუშები.",
      tools: "Composition · Typography · Identity",
    },
    "motion-design": {
      title: "ამბავი მოძრაობაში",
      deliverable: "მოკლე ვიდეო ან ანიმაცია საკუთარი ვიზუალური კონცეფციით.",
      tools: "Editing · Motion · Storytelling",
    },
    "digital-marketing": {
      title: "იდეიდან გაზომვად კამპანიამდე",
      deliverable: "კამპანიის გეგმა აუდიტორიით, კონტენტითა და შეფასების მაჩვენებლებით.",
      tools: "Strategy · Content · Analytics",
    },
    "product-management": {
      title: "პრობლემიდან პროდუქტის გეგმამდე",
      deliverable: "პროდუქტის კონცეფცია, პრიორიტეტები და განვითარების გზამკვლევი.",
      tools: "Discovery · Priorities · Roadmap",
    },
    "project-management": {
      title: "პროექტი მკაფიო მიმართულებით",
      deliverable: "პროექტის გეგმა ვადებით, რესურსებითა და რისკების შეფასებით.",
      tools: "Planning · Resources · Communication",
    },
    sales: {
      title: "საუბარი, რომელიც ღირებულებას აჩვენებს",
      deliverable: "შეთავაზების პრეზენტაცია და გაყიდვის საუბრის პრაქტიკული სცენარი.",
      tools: "Discovery · Value · Negotiation",
    },
    copywriting: {
      title: "სიტყვები საკუთარი ხმით",
      deliverable: "ტექსტების მცირე პორტფოლიო: ვებგვერდი, პოსტი და შეთავაზება.",
      tools: "Tone · Structure · Editing",
    },
    english: {
      title: "მეტი თავდაჯერება საუბარში",
      deliverable: "შენს საწყის დონეზე მორგებული ყოველდღიური საუბრისა და მოსმენის პრაქტიკა.",
      tools: "Speaking · Listening · Practice",
    },
    german: {
      title: "შენი პირველი საუბარი გერმანულად",
      deliverable: "ყოველდღიური სიტუაციების დიალოგები და მოკლე ზეპირი პრეზენტაცია.",
      tools: "Wortschatz · Hören · Sprechen",
    },
    "excel-sheets": {
      title: "ცხრილი, რომელიც შენთვის მუშაობს",
      deliverable: "სამუშაო ცხრილი ფორმულებით, შეჯამებებითა და ვიზუალური დაფით.",
      tools: "Excel · Google Sheets · Charts",
    },
    "public-speaking": {
      title: "შენი იდეა გასაგებად და დამაჯერებლად",
      deliverable: "მოკლე პრეზენტაცია საკუთარი ამბით, სტრუქტურითა და ვიზუალებით.",
      tools: "Story · Voice · Presentation",
    },
    freelancing: {
      title: "შენი უნარი — შენი შეთავაზება",
      deliverable: "სერვისის შეთავაზება, პორტფოლიოს მონახაზი და კლიენტთან კომუნიკაციის გეგმა.",
      tools: "Portfolio · Proposal · Clients",
    },
  };

export function courseExperience(course: Course) {
  const outcome = courseOutcomes[course.slug]!;
  const technical = course.category === "tech";
  const audience = technical
    ? "თუ ტექნოლოგიები გაინტერესებს და გინდა, იდეის შექმნა ნაბიჯ-ნაბიჯ ისწავლო."
    : course.category === "design"
      ? "თუ ვიზუალურად აზროვნება გიყვარს და იდეების პრაქტიკულ ნამუშევრებად ქცევა გინდა."
      : course.category === "business"
        ? "თუ გინდა, იდეებს, მომხმარებლებსა და გუნდურ მუშაობას უფრო სისტემურად მიუდგე."
        : "თუ ახალი პრაქტიკული უნარის შეძენა და ყოველდღიურ საქმიანობაში გამოყენება გინდა.";
  const stages =
    course.durationMonths === 6
      ? [
          "გაეცანი საფუძვლებს",
          "გაამყარე პრაქტიკით",
          "შექმენი პირველი ვერსია",
          "დააკავშირე ცოდნა",
          "იმუშავე პროექტზე",
          "დახვეწე და წარადგინე",
        ]
      : course.durationMonths === 3
        ? ["აღმოაჩინე საფუძვლები", "გამოცადე პრაქტიკაში", "შექმენი და წარადგინე"]
        : ["საფუძვლები და მცირე სავარჯიშოები", "გამოყენება და საბოლოო ნამუშევარი"];
  const months = stages.map((title, i) => ({
    title,
    topic:
      course.topics[
        Math.min(course.topics.length - 1, Math.floor((i * course.topics.length) / stages.length))
      ]!,
    detail:
      i === stages.length - 1
        ? outcome.deliverable
        : "მოკლე ახსნა → მაგალითი → შენი პრაქტიკული დავალება.",
  }));
  return {
    outcome,
    audience,
    months,
    preparation: technical
      ? "ლეპტოპი ან კომპიუტერი, ინტერნეტი და საბაზისო კომპიუტერული უნარები. საწყისი დონის შერჩევაში კითხვარი დაგეხმარება."
      : "ინტერნეტი, პრაქტიკისთვის გამოყოფილი დრო და სწავლის სურვილი. სამუშაო ინსტრუმენტები მიმართულების მიხედვით შეირჩევა.",
  };
}
