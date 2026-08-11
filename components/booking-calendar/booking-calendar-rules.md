---
component: booking-calendar
variants: [default]
states: [default]
depends_on: [colors, typography, radii, spacing]
version: 1.0.0
last_updated: 2026-08-04
---

# Booking Calendar — Rules

## Overview
Calendly-style date & time picker card. Mirrors the Figma `2. Inputs / Booking Calendar` component. Renders the current month, marks weekdays (non-past) as available, and reveals time slots when a day is picked.

## Structure
- `.booking-calendar` — white rounded-lg card, max-width 480px
- `__title` — "Select a Date & Time" (20px/700)
- `__month` — prev/next `__nav` buttons + `__month-label`
- `__grid` — 7-column grid: `__dow` headers + `__day` cells (rendered by JS)
- `__slots` — hidden 3-column time-slot grid, shown after picking a day
- `__tz` — timezone footer

## States
| Element | State | Style |
|---|---|---|
| Day | available | teal 8% bg, teal-700 bold, hover 20% + scale 1.08 |
| Day | selected | teal-500 bg, white |
| Day | today | 4px teal dot below number |
| Day | past/weekend | muted, non-interactive |
| Slot | default | teal outline pill, hover teal 10% + lift |
| Slot | selected | teal-500 fill, white |

## Rules
- Numbers (day cells, times) use Montserrat — import the font
- Requires `booking-calendar.js` (renders grid, wires nav/selection)
- Availability logic is demo-only (weekdays); swap for a real API in production
- Nav buttons need `aria-label`; all interactive elements have `:focus-visible` teal outlines
