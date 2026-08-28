# Mobile Visual QA Checklist v1

Use this checklist for every mobile-facing PR in Design Phase 1.

## Viewports
- 360x800 class
- 390x844 class
- 430x932 class

## Global
- [ ] `document.documentElement.scrollWidth <= window.innerWidth`
- [ ] `document.body.scrollWidth <= window.innerWidth`
- [ ] no right-edge clipping
- [ ] no accidental page zoom / scale workaround
- [ ] no nested container creating an unnecessarily narrow reading column
- [ ] touch targets >=44px
- [ ] visible keyboard focus
- [ ] long localized strings wrap safely

## Header
- [ ] one intentional row
- [ ] no header wrap
- [ ] brand readable
- [ ] language control tappable
- [ ] `KR / EN / JP / 繁中` presentation consistent

## Homepage
- [ ] hero title wraps without clipping
- [ ] metrics/counter readable without overflow
- [ ] search/filter area compact in default state
- [ ] primary CTA is button-sized, not banner-like
- [ ] secondary actions not cramped into one row
- [ ] first work/featured card visible without excessive empty vertical space

## Work / Place detail
- [ ] title readable without shrinking
- [ ] primary map/location CTA visible early
- [ ] reading text >= practical mobile size
- [ ] cards are content-driven height
- [ ] no giant empty placeholder/panel

## Map
- [ ] map/info mobile tab behavior works
- [ ] controls do not collide with safe areas/tabbar
- [ ] deep link opens usable state

## Quiz
- [ ] question and choices readable
- [ ] answer controls >=44px
- [ ] feedback understandable without color alone
- [ ] result cards fit one column
- [ ] retry resets state

## Places / Regions
- [ ] search visible and usable
- [ ] filters do not dominate first screen
- [ ] no-result/reset state works
- [ ] long region/place names do not overflow

## Required evidence
Attach or report:
- [ ] screenshot at 360
- [ ] screenshot at 390
- [ ] screenshot at 430
- [ ] representative KR page
- [ ] representative EN page
- [ ] representative JP page
- [ ] representative zh-Hant page

If screenshot capture is impossible in the current environment, state this as a limitation. CSS-only reasoning is not sufficient to mark visual QA complete.
