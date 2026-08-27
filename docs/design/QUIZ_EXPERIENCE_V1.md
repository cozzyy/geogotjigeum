# Quiz Experience v1 — Design Spec

## Status
**DESIGN READY — USER REVIEW PENDING / FIGMA VISUAL PENDING**

This design track follows Homepage A, Work Detail v1.1, and Map Explorer v1.

Current reference implementation:
- `site/contentmap_quiz_poksshak.js`
- quiz modal in `site/index.html`
- quiz rendering / state in `site/contentmap_app.js`
- quiz styles in `site/contentmap_style.css`

The current `poksshak` pilot contains 10 questions, per-answer rewards (`secret` / `fortune`), and three verified result-location IDs. The data structure is already expandable by work ID.

## 1. Product role
Quiz is not a detached mini-game. Its job is to deepen the user's memory of a work and return that attention to real places.

Core flow:

`work memory → question → answer feedback → small discovery/reward → result → real locations / map`

The quiz should feel like part of Geugotjigeum, not a generic trivia template.

## 2. Design direction — Playful Editorial
Use the existing brand system, but slightly lighter and more playful than the homepage/map.

### Visual character
- dark brand shell / top bar
- warm off-white or very light neutral question surface
- near-black reading text
- coral as primary progress / action accent
- green only for correct-state semantics
- restrained red/coral only for wrong-state semantics
- small scene/image moments rather than decorative confetti everywhere

The quiz should feel energetic without becoming visually noisy.

## 3. Desktop composition
Recommended desktop container: centered focused panel around 600–680px wide, with dimmed cinematic background or work-art context.

1. Compact work identity header
   - work title
   - `QUIZ`
   - close/back action
2. Progress
   - `3 / 10` or `3 / 20`
   - horizontal progress bar
   - no timer by default
3. Question card
   - one question
   - optional small verified scene/image only when available
4. Four answer options
   - large readable rows
   - clear selected / correct / wrong states
5. Feedback area
   - short answer feedback
   - reward / trivia card
6. Next question CTA

Do not jump layout positions dramatically after answer submission.

## 4. Mobile composition
The current implementation already uses a full-screen modal pattern on mobile. Preserve that interaction model.

Recommended hierarchy for 390px:
1. 56–64px top bar
2. progress + work label
3. question
4. vertically stacked answer buttons
5. feedback/reward block
6. sticky or visually stable `다음 문제` action near bottom

QA widths: 360 / 390 / 430px.

Touch targets: >= 44px.

## 5. Question state design
### Default
- light surface
- neutral border
- answer rows easy to scan

### Selected / locked
After selection, disable accidental re-answering.

### Correct
- do not fill the whole screen bright green
- use green border/icon + subtle tinted surface
- feedback should immediately explain why

### Wrong
- selected wrong answer gets restrained red/coral state
- correct answer should also become discoverable
- wording should not shame the user

## 6. Reward / discovery treatment
Current data includes `secret` and `fortune` rewards. Preserve the data and behavior, but give rewards a consistent editorial card treatment.

Preferred labels in UI can be localized without changing stored data:
- `secret` → `숨은 이야기` / `Behind the Scene`
- `fortune` → `오늘의 한마디` / lightweight message

Do not make fortune-like copy look like actual prediction, health, money, or life advice.

Reward cards should be secondary to the question, not larger than the question itself.

## 7. Result screen — the important part
The result screen should connect quiz completion back to travel.

Hierarchy:
1. score / completion message
2. short personalized-but-non-judgmental summary
3. `이 작품의 실제 장소` section
4. 3 verified location cards from existing `resultLocations`
5. primary CTA: `지도에서 촬영지 보기`
6. secondary CTA: `다시 풀기`
7. tertiary: `작품으로 돌아가기` / other work discovery

For `poksshak`, keep using existing verified IDs only:
- `seongsan_ilchulbong`
- `hyeopjae_beach`
- `gochang_hagwon_farm`

Do not duplicate place data in quiz files; render location information from the existing place/location source.

## 8. Scale to 20 questions
Current pilot has 10 questions. The UI must support a future 20-question standard without redesign.

Do not show 20 numbered dots. Use:
- numeric progress (`7 / 20`)
- compact progress bar

The design must also tolerate localized question text expansion in EN / JP / zh-Hant.

## 9. Accessibility / readability
- body/question text should meet readable contrast on light surfaces
- do not rely on color alone for correct/wrong states; include icon/text
- keyboard focus visible on desktop
- answer option hit area >= 44px
- avoid motion that blocks reading or forces waiting
- respect reduced-motion where practical

## 10. Preserve
Do not rewrite quiz architecture just for design.

Preserve:
- `QUIZ_DATA[workId]` expansion model
- current score/state behavior unless a real bug is found
- current result location IDs
- existing map/location action behavior
- KR / EN / JP / zh-Hant localization behavior
- existing work data and factual-accuracy rules

No backend/login/points system is required for v1.

## 11. Out of scope
- account/login
- leaderboard
- global points economy
- competitive ranking
- paid rewards
- social login
- major quiz data-model migration
- fabricated trivia

These can be reconsidered only after the basic quiz loop proves useful.

## 12. Figma frames planned
When Figma MCP write quota is available:
- `Quiz Desktop — Question`
- `Quiz Desktop — Answer Feedback`
- `Quiz Desktop — Result`
- `Quiz Mobile 390 — Question`
- `Quiz Mobile 390 — Feedback`
- `Quiz Mobile 390 — Result`

## 13. QA when implemented
Desktop:
- 1280 / 1440

Mobile:
- 360 / 390 / 430

Required:
- no horizontal overflow
- stable question/feedback layout
- long localized copy does not clip
- 44px touch targets
- correct/wrong states understandable without color only
- retry resets state correctly
- result location cards open existing place/map behavior
- no new JS console errors

## 14. Next design track
After Quiz:

`Place Detail → supporting discovery screens / shared components`

Place Detail should reuse the Hybrid Light Editorial reading logic from Work Detail and the bright information-panel logic from Map Explorer.