# Claude Design prompt — Zhamo

Paste **Prompt 0** first. It establishes the design system and gets one screen right. Then run prompts 1–6 in order, in the same conversation, so the system stays consistent across every screen.

Running all of it as a single message will produce thin work on the later screens. The batching is deliberate.

---

## Prompt 0 — Design system + first screen

```
You're the design lead for Zhamo, a business management and online booking
platform for appointment-based service businesses — barbershops, tattoo and
spa salons, dental clinics, nail studios, car washes, swimming pools,
coworking spaces, and private teachers. Owners run their whole day inside it:
calendar, team, clients, services, money. Their clients book through a public
widget with no signup.

The market reference is alteg.io. I want that class of product — dense,
professional, built for someone who lives in it eight hours a day — but not a
clone. Zhamo's differentiator is that it spans nine verticals from one
codebase, and the interface should feel purpose-built for whichever one you're
in rather than generically neutral.

Primary user: a salon owner or receptionist, 25–50, moderate computer
comfort, using this on a laptop at a front desk with clients waiting. Speed
and legibility beat elegance. Every screen is used dozens of times a day, so
it has to reward repetition, not first impressions.

Start by proposing a design system, then build one screen with it.

DESIGN SYSTEM — propose and show me:

- Palette. Start from this direction and refine it, don't just accept it:
    dark sidebar #16161A, primary action yellow #FFC935 with near-black text,
    secondary/link blue #2C6CF6, app background #F5F6F8, card white,
    border #E6E8EB, success #22C55E, danger #EF4444.
  Add a per-vertical accent system: each business type (Beauty, Healthcare,
  Sport & Fitness, Education, Automobile, Consumer services) gets one accent
  that persists through the back office. Show the six accents and how they
  sit against the neutral base.

- Type. Two faces. A characterful geometric grotesque for display, set very
  large and very tight (letter-spacing around -0.02em, line-height near 1.05)
  — the contrast between huge headings and small dense UI text is most of the
  personality. A neutral grotesque for UI and body. Give me the scale:
  display, h1, h2, body, small, micro, with weights.

- Density and spacing. This is a data product. 32px input height, 40px table
  rows, 8px card radius, 6px chips, 4px table cells. Borders do the work of
  separation — almost no shadow. Give me the spacing scale.

- Core components: button (primary/secondary/ghost/danger), input, select,
  chip/toggle-group, checkbox, toggle, table row, card, modal, toast, badge,
  avatar, empty state, sidebar nav item (default/hover/active).

CONSTRAINTS:
- Sentence case everywhere. No title case buttons.
- Buttons name the outcome, not the mechanism: "Save changes", not "Submit".
  The verb persists — a "Publish" button produces a "Published" toast.
- Empty states are invitations to act, not apologies.
- Avoid the AI-default looks: no cream background with a serif display and
  terracotta accent, no near-black page with one acid-green accent, no
  broadsheet hairline-rule layout. This brief pins the palette to a dark
  sidebar and yellow primary — work within that.
- Keyboard focus must be visible. Respect prefers-reduced-motion.
- Responsive down to tablet. The calendar can assume ≥1024px.

Then build the first screen with the system: THE DAY CALENDAR, the app's home
screen.

  - Dark left sidebar, collapsed-icon and expanded states. Nav items:
    Reports, Team, Clients, Online booking, Services, Products, Finance,
    Payroll, Notifications, Loyalty, Resources, Integrations, then a divider,
    then Settings and Billing. Bottom: current user with email and a logout
    icon, then a full-width accent-colored "Administration" button.
  - Second rail: mini month calendar with per-day density indicators, then
    quick-action tiles (Product sale, New payment, Service list, Product
    catalog, Waiting list), then a collapsible Favorites section.
  - Main area toolbar: Today button, prev/next arrows, date title
    ("13 August, Thursday"), and on the right — Sell dropdown, currency,
    Day/Week toggle, filter, zoom, view switcher.
  - Grid: one column per team member with avatar, name, and specialization in
    the header. Time axis 09:00–22:00 in 30-minute rows, labeled on BOTH the
    left and right edges. Non-working hours shaded. Show 4 team member
    columns with a realistic mix: appointments of different durations, two
    overlapping, one technical break, one no-show styled differently, and
    genuine empty space — a real day is not full.
  - Appointment blocks show client name, service, and time, and degrade
    gracefully at 30-minute height.
  - Show the empty state too: what this looks like on day one with no
    appointments.

Use real content throughout — real service names, real Armenian first names,
prices in Armenian dram (֏), phone numbers in +374 format. No lorem ipsum, no
"Service 1 / Service 2".
```

---

## Prompt 1 — Onboarding

```
Now the onboarding flow, using the same system. This runs before the user
ever sees the dashboard, and every answer changes what gets seeded.

SCREEN 1 — "Let's get acquainted!"
Huge display heading, small subhead ("Tell us about yourself and your
business. It'll take less than 30 seconds.").
Fields: first and last name; "How many locations does your business have?" as
a three-option chip group (One / Multiple / I'm self-employed); brand name;
position as a select (Owner, Manager, Receptionist, Professional, Marketer,
Accountant). Single primary Continue button.
Show the select in both closed and open states.

SCREEN 2 — "A couple of questions about your business"
Business type as a wrapping chip group: Beauty, Healthcare, Sport & Fitness,
Education, Entertainment, Consumer services, Automobile, Retail, Other.
Industry as a dependent select, visibly disabled until a type is picked.
Team size chips: 1 / 2–4 / 5–7 / 8–14 / 15+.
"Do you provide services yourself?" Yes / No.
Back + Continue.
Show one state with nothing selected and one with Beauty selected — and in
the selected state, the vertical accent should already have taken over the
page. That's the moment the product declares itself.

SCREEN 3 — "Where are you from?"
Country and city selects, "How did you hear about us?" chips (Recommendation,
Internet advertising, Conference, Longtime fan, I don't remember), a subtle
"I have a promo code" text link that expands into a field. Back + Continue.

Design the progress indicator across all three. Not a generic 1-2-3 stepper —
find something that suits a 30-second flow.
```

---

## Prompt 2 — Forced setup modal

```
Next: the three-step setup modal that fires immediately after onboarding. The
user cannot reach the calendar without completing it, because a service, a
person to perform it, and a schedule are the minimum data the calendar needs
to render.

Layout: two panes inside one modal. Left pane is a muted skeleton preview
that animates to show what the user is building. Right pane is the form. A
progress bar and "Step N of 3" sit at the bottom of the left pane.

STEP 1 — Create a service
"Write the name of the service and category, and set the cost and duration."
Fields: Name (placeholder "Example: Haircut"), Category ("Example:
Haircuts"), Price with ֏ suffix, Duration as radio chips (30 m / 1 h /
1 h 30 m). The left skeleton shows a service list filling in.

STEP 2 — Add team member
Copy references step 1 directly: "You've just created a service. Now add the
name and specialization of the team member who'll perform it."
Fields: Name, Specialization. The left skeleton shows team cards, with a
checkmark on the one being created.

STEP 3 — Choose a work schedule
"The schedule is created a month in advance. Working days and hours can be
changed at any time in settings."
Day-of-week toggle group (Sun–Sat), then opening-hours presets as radios
(9:00–18:00, 9:00–22:00, 10:00–18:00, 10:00–22:00) plus a "Custom hours"
option that reveals time pickers. The left skeleton shows a week grid.

COMPLETION SCREEN — full modal, no panes
Celebratory but restrained. A numbered 1-2-3 walkthrough of booking the first
client, a checkmark line confirming setup is done, a muted line about the
trial, and one primary CTA: "Schedule first client".
Design the illustration or graphic treatment yourself — make it specific to
Zhamo rather than generic 3D SaaS confetti.
```

---

## Prompt 3 — Appointment panel

```
Now the densest screen: the new-appointment panel. It opens when a
receptionist clicks an empty calendar slot. Three columns, full height, with
the calendar dimmed behind it.

LEFT COLUMN — timing
Team member select, date picker, appointment start and end time with a
duration select, "Technical break" with an "+ Add break" button, a pinned
fields area, an appointment comments textarea, and three square tiles:
Advanced fields, Repeat, Notifications.

CENTER COLUMN — what they're buying
Status chip row at the top: Pending / Arrived / No-show / Confirmed, each
visually distinct, with Pending active. Then Services and Products tabs,
a search field, a helper line, and a service list with expandable rows
showing price and duration.

RIGHT COLUMN — who
Client name, phone with a +374 country-code selector, email, a "Client is
booking for another visitor" checkbox, and a "Previous clients" section that
suggests matches as the phone number is typed.

FOOTER — sticky, full width: "New appointment" label on the left, primary
"Save appointment" on the right.

Also show: the green "Saved" toast, top-right; the panel in edit mode for an
existing appointment (with a delete action and status set to Confirmed); and
the conflict state — what the user sees when the slot was taken while they
were filling this in.
```

---

## Prompt 4 — Team and clients

```
Two list-heavy management screens. Show how tables work in this system.

TEAM MEMBERS LIST
Page header with title, info icon, favorite star, and a "Subscription
management" outline button top-right. Search field + primary "Add" button.
Filter row: Position, Employment status, Account status, Access, Included in
plan — plus Find and Reset buttons and a "Found: N" count.
Tabs: Position / Specialization / System users.
Grouped table with a collapsible group header ("Without position — 2 team
members"). Columns: Team member (avatar, name, position, phone, email),
Schedule (either a green "until 06.09.2026" badge or a muted "Add to
schedule" link), Online booking (toggle), Services (count), Role, Subscription
("Paid" with an edit pencil), overflow menu.
Show one member with a login and one still at "Invite" status.
The sidebar Team item is expanded here, revealing sub-items: Team members
list, Work schedule, Positions.

CLIENT BASE
Header with title and an "Add client" primary button plus an Excel export
split-button. Full-width search.
Segment links as one-click filters: New, Returning, Lost, Expiring membership.
Filter row: Appointments, Clients, Sales dropdowns, a clear-filters icon, and
a Show button.
Table with a select-all checkbox column and columns: Name, Phone, Email,
Sold, Account balance, Visits, Discount, Last visit, First visit. Some column
headers carry a lock icon (field-level permissions) and there's a gear for
column configuration.
Footer: results-per-page select, pagination, result count, Bulk actions.
Show a populated table AND the empty state.

ADD CLIENT FORM (as a slide-over panel)
Name; Phone and Additional phone, both with +374 selectors; Email; Date of
birth; Gender; Importance class; Card number; Discount %; a "Disable online
booking" toggle; Note textarea; Category select; and a Payments section with
Sold and Paid fields. Sticky Save footer.
```

---

## Prompt 5 — Public booking widget

```
Now the client-facing side — a completely different product surface. Same
brand, but this is a stranger on a phone who has never seen Zhamo and must
book in under 60 seconds with no account.

Design it mobile-first, then show the desktop/embedded version.

Business header: cover image, logo, business name, address, rating, hours.

STEP 1 — Choose a service. Categories with expandable service lists, each
service showing name, duration, and price. Multi-select builds a cart with a
running total and combined duration.

STEP 2 — Choose a specialist. Cards with photo, name, specialization, and a
rating. An "Any specialist" option sits first and is visually distinct — it's
the fastest path and should look like it.

STEP 3 — Choose date and time. A horizontal date strip, then time slots
grouped by Morning / Afternoon / Evening. Show a day with limited
availability, and the state where a day is fully booked.

STEP 4 — Contact details. Name and phone only. Optional comment. Show the SMS
verification code step.

STEP 5 — Confirmation. Full booking summary: service, specialist, date, time,
duration, price, address. Actions: add to calendar, get directions, cancel
booking. A muted line about the cancellation cutoff.

Also design:
- The step indicator across all five
- The "sorry, that slot was just taken" recovery state, which must offer
  nearby alternatives rather than dumping the user back to step 1
- The embedded-widget desktop version, sized for an iframe on a business's
  own site
- How the per-vertical accent changes this: show step 1 for a barbershop and
  step 1 for a dental clinic side by side

Booking must never require creating an account. Name and phone at the end,
nothing more.
```

---

## Prompt 6 — Loose ends

```
Finally, the screens that get skipped and then hurt:

- Work schedule editor: month grid per team member, click-drag to set shifts,
  bulk-apply a weekly template, mark days off
- Services list: categories, drag to reorder, per-service which team members
  can perform it
- Notification templates: editing an SMS template with variable chips
  (%SERVICE_TITLE%, %MASTER_NAME%, %DATETIME%) and a live preview of the
  rendered message
- Online booking settings: reorderable booking steps, widget theming,
  cancellation cutoff, "any specialist" rules, and the generated booking link
  with a copy button
- Reports overview: revenue by day, by service, by team member; occupancy
  rate; new vs returning clients. Charts must use the design system, not
  library defaults.
- Every empty state across the product, as one collected sheet
- Every error and loading state: table skeletons, failed save, offline,
  permission denied
- Mobile back office: the calendar day view on a phone, for an owner checking
  their shop from elsewhere

Then give me the full design system as a single reference sheet: tokens,
components in all states, and the per-vertical accent variations.
```

---

## Notes on running this

- **Keep it in one conversation.** The system built in Prompt 0 is what makes screens 1–6 cohere.
- **If a screen comes back generic,** name the specific thing that's wrong rather than asking for "something better." "The status chips read as generic Tailwind badges — Pending, Arrived, No-show, and Confirmed need to be distinguishable at a glance from three feet away" gets a real revision.
- **Push back on the calendar at least twice.** It's the hardest screen and the first version rarely handles overlapping appointments or 30-minute blocks well.
- **The vertical accent is the risky idea.** If it looks gimmicky in practice, cut it and keep the yellow throughout — but ask for it first, because it's the one thing that would make Zhamo not read as an Altegio clone.
