# Screenshot Match

Implement exactly the screenshot and nothing else

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/06b1c938-a45b-45fe-aec2-c0d7ca6d0e48).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## SkillFlow Guide (OpenAI)

The floating Guide opens two modes: career exploration and learning support. A three-question, rule-based career questionnaire works without an API key. It uses the actual course catalog and adapts the first-week plan to experience and available time. The questionnaire is explicitly labeled separately from AI replies.

To activate free-text AI replies locally:

1. Copy `.env.example` to `.env.local`.
2. Set `OPENAI_API_KEY` in `.env.local`. Do not use a `VITE_` prefix or commit the file.
3. Optionally change `OPENAI_MODEL` (default `gpt-4.1-mini`).
4. Restart the development server. Vite reads the credentials into the server process; browser code receives only a configuration status.

For hosted execution, provide the same variables in the server runtime's secret/environment settings. This requires server hosting; a static-only export cannot serve the AI functions. Before public rollout, use the host's persistent request limits and an account/project spending limit. Message size, history length, output length, and a 30-second upstream timeout are bounded in the application; these are not a substitute for deployment-wide abuse protection.

Chats and questionnaire answers stay in the page's memory and clear on refresh. AI requests send the recent conversation and selected learning context to OpenAI, with `store: false`. The UI discloses the provider before sending. There are no student records or lesson-material retrieval integrations; the tutor uses the selected course and conversation, not a private curriculum. No actual OpenAI call is necessary for tests: provider success, missing configuration, errors, throttling and timeouts use mocks.

References: [Responses API](https://developers.openai.com/api/docs/guides/migrate-to-responses), [GPT-4.1 mini](https://developers.openai.com/api/docs/models/gpt-4.1-mini).
