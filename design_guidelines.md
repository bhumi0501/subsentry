# SubSentry - Subscription Tracker Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from modern fintech dashboards (Mint, YNAB) combined with productivity tools (Notion) for clean data visualization and categorization systems.

## Core Design Principles
1. **Financial Clarity**: Spending data must be immediately scannable with clear visual hierarchy
2. **Alert Prominence**: Upcoming renewals deserve immediate attention without being alarming
3. **Vibe Coding**: Three-category system provides intuitive visual organization beyond traditional tagging

## Typography
**Font Stack**: System fonts via Tailwind defaults (ui-sans-serif)
- Headings: 2xl-lg, font-extrabold to font-semibold
- Body text: base-sm, font-medium to font-normal
- Financial figures: 2xl-lg, font-bold (emphasis on numbers)
- Meta information: xs, regular weight, muted color

## Layout System
**Spacing**: Tailwind units of 2, 3, 4, 6 for tight spacing; 12, 16, 20, 24 for section spacing
- Card padding: p-4 to p-6
- Section gaps: gap-4 to gap-6
- Container: max-w-5xl centered
- Grid: 1 column mobile, 3-column desktop (1-col sidebar + 2-col main)

## Vibe Color System
**Three distinct color families for subscription categorization:**

**Secure** (Essential services - teal/green):
- Card background: teal-50
- Card ring: teal-200/60
- Badge: teal-800 text on teal-100 background
- Use for: utilities, insurance, essential tools

**Clear** (Review recommended - indigo/blue):
- Card background: indigo-50
- Card ring: indigo-200/60
- Badge: indigo-800 text on indigo-100 background
- Use for: entertainment, mainstream services

**Empowering** (Optional growth - violet/pink):
- Card background: violet-50
- Card ring: violet-200/60
- Badge: violet-800 text on violet-100 background
- Use for: professional development, premium tools

**Accent Colors**:
- Primary actions: indigo-600 (Add buttons, submit)
- Secondary actions: teal-600 (alternative CTAs)
- Destructive: red-600 (remove actions)
- Neutral: gray-50 backgrounds, gray-500 text

## Component Library

### Dashboard Cards
- **Overview Card**: White background, rounded-2xl, minimal shadow
- **Spending Summary**: Gradient background (indigo-50 to white), large bold numbers
- **Renewal Alerts**: White with border, compact list format
- **Subscription Cards**: Vibe-colored with ring-2, rounded-2xl, showing name, price, category, next billing

### Navigation & Controls
- **Search Bar**: Full-width input with border, rounded-md
- **Filters**: Dropdown select matching input style
- **Action Buttons**: 
  - Primary: colored background (indigo-600, teal-600) with white text
  - Secondary: white background with border
  - Small actions: px-2 py-1, text-xs

### Modal Dialogs
- Overlay: black/40 backdrop
- Content: white, max-w-xl, rounded-2xl, shadow-lg
- Form grid: 2 columns on desktop, 1 on mobile
- Input consistency: all form elements use px-3 py-2 border rounded-md

### Data Display
- **Financial Metrics**: Large numbers (text-2xl) with small labels (text-sm text-gray-500)
- **Countdown Timers**: "in X days" format, text-xs, muted
- **Lists**: space-y-2 to space-y-3, clean separation
- **Badges**: px-2 py-0.5, text-xs, rounded, vibe-colored

## Responsive Behavior
- Mobile (base): Single column, stacked layout, full-width cards
- Tablet (md): 2-column subscription grid, sidebar remains separate
- Desktop (lg): 3-column layout (1 sidebar + 2 main), 2-column subscription grid

## Interactions
- **Hover states**: Minimal - rely on Tailwind default button hover
- **Mark Paid**: Updates next billing date, no page reload
- **Remove**: Confirmation dialog before deletion
- **Add Subscription**: Modal overlay with form validation

## Key Screens
1. **Main Dashboard**: Left sidebar (overview + alerts) + right area (search, filters, subscription grid)
2. **Add Modal**: Centered overlay with 6-field form (name, price, period, date, vibe, category)
3. **Empty State**: Center-aligned message when no subscriptions match filters

## Images
**No hero images required** - This is a utility dashboard focused on data display. Financial applications benefit from clean, distraction-free interfaces where data is the hero.

## Special Considerations
- Maintain clear visual distinction between vibe categories at all times
- Financial figures always use rupee symbol (₹) before amount
- Next billing dates in ISO format (YYYY-MM-DD) for clarity
- Upcoming renewals sorted by proximity (soonest first)
- Category labels provide context but vibe tags provide primary organization