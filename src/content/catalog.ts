// Temporary static catalog for the landing page; moves to the database in the catalog step.
export type Category = "tech" | "design" | "business" | "content" | "other";

export const categories: { id: Category | "all"; label: string }[] = [
  { id: "all", label: "ყველა" },
  { id: "tech", label: "ტექნოლოგიები" },
  { id: "design", label: "დიზაინი" },
  { id: "business", label: "ბიზნესი და მარკეტინგი" },
  { id: "content", label: "კონტენტი და ენები" },
  { id: "other", label: "სხვა" },
];

export const courses: { title: string; category: Category; pilot?: boolean }[] = [
  { title: "Fullstack ვებ-დეველოპმენტი", category: "tech", pilot: true },
  { title: "Frontend დეველოპმენტი", category: "tech" },
  { title: "Backend დეველოპმენტი", category: "tech" },
  { title: "AI ინჟინერია", category: "tech" },
  { title: "Data Science და ანალიტიკა", category: "tech" },
  { title: "კიბერუსაფრთხოება", category: "tech" },
  { title: "DevOps და Cloud", category: "tech" },
  { title: "UI/UX დიზაინი", category: "design" },
  { title: "გრაფიკული დიზაინი", category: "design" },
  { title: "Motion დიზაინი და ვიდეო მონტაჟი", category: "design" },
  { title: "ციფრული მარკეტინგი", category: "business" },
  { title: "პროდუქტის მენეჯმენტი", category: "business" },
  { title: "პროექტის მენეჯმენტი", category: "business" },
  { title: "გაყიდვები და მოლაპარაკება", category: "business" },
  { title: "კოპირაიტინგი", category: "content" },
  { title: "ინგლისური (A1–C1)", category: "content" },
  { title: "გერმანული", category: "content" },
  { title: "Excel და Google Sheets", category: "other" },
  { title: "საჯარო გამოსვლა", category: "other" },
  { title: "ფრილანსინგი", category: "other" },
];
