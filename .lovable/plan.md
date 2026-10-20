# SkillFlow AI — Step 0 proposal (awaiting approval)

## Stack adjustments (platform constraints)
- Framework: TanStack Start (React 19, Vite) instead of Next.js — same capabilities (SSR, server functions, API routes). Tailwind v4 + shadcn/ui.
- Backend: Lovable Cloud (Postgres, Auth email + Google, Storage, RLS).
- AI: Lovable AI Gateway by default (no key needed); Claude can be plugged in later behind the same `AIProvider` interface.
- Avatar video, payments, STT: behind adapters; mock adapters first, real providers (HeyGen/D-ID, BOG iPay/TBC/Flitt/Stripe) added when keys are available.
- Font: Noto Sans Georgian. UI in Georgian, code in English.

## Folder structure
```text
src/
  routes/
    index.tsx                 landing
    catalog.tsx, catalog.$slug.tsx
    pricing.tsx, auth.tsx, verify.$certId.tsx
    _authenticated/
      onboarding.tsx
      dashboard.tsx
      course.$slug.tsx                 9-month roadmap
      lecture.$lectureId.tsx           lecture room
      quiz.$id.tsx, exam.$id.tsx, assignment.$id.tsx
      profile.tsx, billing.tsx
      admin/*                          courses, codes, refunds, analytics
    api/public/payments/webhook.$provider.ts
  server/
    ai/        provider.ts, gateway.ts, tutor.functions.ts, grading.functions.ts
    avatar/    provider.ts, mock.ts, heygen.ts, did.ts
    payments/  provider.ts, mock.ts, bog.ts, tbc.ts, flitt.ts, stripe.ts
    access/    entitlement.ts (trial/active/past_due/paused/canceled rules)
  components/ (landing, roadmap, lecture, assessment, ui)
  content/fullstack/ (pilot syllabus seed)
```

## DB schema (all with RLS: users see only their own rows)
- Catalog: categories, professions, courses, avatars, modules (9/course), course_days, lectures, lecture_videos, course_documents (RAG chunks)
- Learning: profiles, user_enrollments (schedule, study days, hours/week), user_progress, chat_messages
- Assessment: quizzes, exams, assignments, questions (type enum), quiz_attempts, exam_attempts, submissions, grades, certificates (public verify slug)
- Billing: plans (100 GEL/mo), subscriptions (status enum), payments, invoices, discount_codes, trials, refunds, webhook_events (idempotency key)
- Roles: user_roles table + has_role() for admin

## Avatar abstraction
```ts
interface AvatarProvider {
  createVideo(script, avatarId, voiceId): Promise<{ jobId }>
  getStatus(jobId): Promise<{ status; videoUrl?; captionsVtt? }>
}
```
Selected via env `AVATAR_PROVIDER`; result cached in lecture_videos/Storage; fallback = TTS + animated 2D avatar.

## Payment abstraction
```ts
interface PaymentProvider {
  createCheckout(sub, amount, currency): Promise<{ redirectUrl }>
  chargeRecurring(token, amount): Promise<PaymentResult>
  refund(paymentId, amount): Promise<RefundResult>
  verifyWebhook(req): Promise<NormalizedEvent>
}
```
Webhook route verifies signature, dedupes by event id, drives the subscription state machine. Business rules (3-day grace, 2-month pause, 12-month retention, 7-day/10% refund) live in one tested module.

## Build order (pause for confirmation after each)
1. Design system + landing page
2. Auth + onboarding
3. Billing + server-side access control (mock provider)
4. Catalog (all categories seeded)
5. Course dashboard / roadmap
6. Lecture room (text) with Fullstack pilot content
7. AI Q&A tutor (RAG, quick actions, rate limits)
8. Assessments + AI grading
9. Avatar video
10. Certificates
11. Admin panel
