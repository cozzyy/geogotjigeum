# Geugotjigeum Design System v1

## 1. Purpose
This is the minimum visual system for the approved homepage direction: **A. Cinematic Content Discovery**.

Goal: make K-content scenes feel cinematic while keeping filming-location discovery and travel actions obvious.

## 2. Visual principles
- Dark cinematic canvas, not a flat black page.
- Images/scenes are the visual protagonist.
- Warm coral is the main action accent.
- Cards and surfaces use layered dark neutrals rather than heavy borders.
- Information hierarchy must stay clear on mobile before desktop polish.
- Do not imitate Netflix UI literally.
- Avoid generic tourism-board styling.

## 3. Core color tokens
- `--ds-bg: #0A0B0F`
- `--ds-bg-elevated: #141820`
- `--ds-hero-left: #232A38`
- `--ds-hero-right: #10141C`
- `--ds-panel: #151923`
- `--ds-accent: #FF7B57`
- `--ds-accent-soft: #FF9B7D`
- `--ds-text: #FFFFFF`
- `--ds-text-2: #CDD2DC`
- `--ds-text-3: #9EA5B2`
- `--ds-line: #242A34`

## 4. Typography
Use the current production-safe font stack unless an existing project font already has stronger KR/EN/JP/ZH coverage.

Recommended scale:
- Logo: 22px / 700
- Desktop Hero: 44px / 700-800
- Mobile Hero: 30px / 700-800
- Section title: 22-24px / 700
- Card title: 15-16px / 600-700
- Body: 14-16px / 400
- Meta: 11-13px / 500-600

Rules:
- Keep Korean line-height around 1.45-1.6 for body text.
- Avoid ultra-condensed line lengths on desktop.
- Multilingual labels must not break layout when translated.

## 5. Spacing / radius
- Main horizontal desktop padding: 40-56px
- Mobile horizontal padding: 20-22px
- Section gap: 40-56px desktop / 28-36px mobile
- Card radius: 16-18px
- Pill radius: 999px
- Button min height: 44px mobile

## 6. Core components
### Header
- Left: `그곳지금` brand
- Middle: works / places / map / quiz entry points as supported by current app
- Right: language switcher
- Keep existing language behavior and i18n rules; redesign only presentation.

### Primary CTA
- Coral fill `#FF7B57`
- White text
- Strong but not oversized

### Secondary CTA
- Light or dark neutral contrast depending on background
- Must remain visually subordinate to primary CTA

### Work card
- Image-dominant top area
- Title + short location metadata
- Minimal secondary chrome
- Hover/focus should not move layout

### Featured scene panel
- Used for one story/scene hook
- Must connect scene → work → actual place
- Avoid repeated “사실은…” gimmick copy as a system default

## 7. Responsive rules
Mandatory QA widths:
- 360px
- 390px
- 430px
- 1440px desktop

Mobile:
- Hero copy max 2-3 lines when possible
- CTA row may wrap but must not overflow
- Work cards become single-column or horizontal-scroll only if clearly intentional
- Touch targets >= 44px
- No horizontal page scrolling

## 8. Accessibility / interaction
- Preserve visible keyboard focus
- Text/background contrast must remain readable on dark surfaces
- Buttons must use semantic elements where possible
- Do not encode state by color alone

## 9. Images
- Reuse existing verified production assets first.
- Do not add paid stock services for this implementation.
- Use aspect-ratio placeholders if an existing content image is unavailable.
- Keep lazy loading/performance behavior intact.

## 10. Scope
This v1 is intentionally minimal. It covers homepage/header/cards/CTA visual language first. Map, hooking pages, quizzes and detail screens should adopt the system progressively after homepage validation.
