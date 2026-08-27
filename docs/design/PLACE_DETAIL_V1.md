# Place Detail v1 — Design Direction

## Status
**EARLY DESIGN PLAN — AFTER QUIZ**

This is the next visual system rollout after Quiz Experience v1.

## Product role
A place-detail screen is where the user moves from fandom context into practical travel context.

Core flow:

`why this place matters in the work → what it is now → how to visit → nearby / related discoveries`

## Direction
Reuse the established hybrid system instead of inventing a fourth visual language.

### Top
- dark/cinematic place hero when a strong image exists
- work/scene context badge kept restrained
- clear place name and current location

### Reading / travel information
- warm off-white / bright surface
- near-black text
- compact facts
- practical travel CTA hierarchy

### Actions
Primary:
- map / directions

Secondary:
- related work
- nearby places
- share

## Initial desktop structure
1. global header
2. place hero / image
3. place name + work context
4. practical visit information
5. scene/story context
6. nearby / related places
7. map action

## Initial mobile structure
1. compact header
2. image hero
3. place name + location
4. sticky/obvious map CTA
5. visit info
6. story context
7. related places

## Preserve
- existing place URLs and deep links
- factual place data
- map behavior
- SEO metadata
- multilingual routes

## Avoid
- tourism-board information overload
- long black-background reading sections
- duplicated place data across work/quiz/map files
- inventing opening hours/prices/transport data without a reliable source

## Future QA
- mobile 360 / 390 / 430
- desktop 1280 / 1440
- long translated place names
- map CTA visibility
- image fallback
- no SEO/i18n regression
