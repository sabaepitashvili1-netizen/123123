import { Play } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
export function PromoVideo({ className = "" }: { className?: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className={className} aria-label="SkillFlow-ის მოტივაციური ვიდეოს ნახვა">
          <Play fill="currentColor" size={22} />
        </button>
      </DialogTrigger>
      <DialogContent className="promo-video-dialog">
        <DialogTitle>შენი მომავალი იწყება დღეს.</DialogTitle>
        <DialogDescription>
          15-წამიანი სამოტივაციო ვიდეო · შენი AI მენტორი
        </DialogDescription>
        <video
          controls
          playsInline
          autoPlay
          preload="metadata"
          poster="/media/skillflow-mentor-cover.jpg"
          aria-label="SkillFlow-ის მოტივაციური ვიდეო"
        >
          <source src="/media/skillflow-mentor.mp4" type="video/mp4" />
          შენი ბრაუზერი ვიდეოს ვერ აჩვენებს.{" "}
          <a href="/media/skillflow-mentor.mp4">ჩამოტვირთე ვიდეო</a>.
        </video>
        <p>არ არის საჭირო, ყველაფერი იცოდე. დაიწყე ერთი ნაბიჯით. ისწავლე, შექმენი და აღმოაჩინე, რა შეგიძლია. შენი მომავალი იწყება დღეს — სქილფლოუ.</p>
      </DialogContent>
    </Dialog>
  );
}
