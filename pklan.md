# PK Travel Games - Implementation Plan

## 1. Core Architecture
- **Framework**: Vanilla JS + Vite.
- **Styling**: Vanilla CSS with customized variables (glassmorphism, vibrant gradients).
- **State Management**: Simple global state object.
- **Routing**: Single Page Application (SPA) with a `currentView` controller.

## 2. Design System (`src/style.css`)
- **Typography**: Inter / Outfit (Google Fonts).
- **Colors**:
  - Primary: `violet-600` / `blue-500`ish.
  - Background: Dark Glassy UI.
- **Components**:
  - `Card`: Frosted glass effect.
  - `Button`: Pulsing or glowing with hover.
  - `Input`: Clean, focused state.

## 3. Game Mode: Pigeon
- **Logic**:
  1. Load question from a JSON/array.
  2. State: `INPUTTING_FAKES`. Show 2 inputs.
  3. State: `REVEAL`. Shuffle real + fakes and show choices.
  4. State: `RESULT`. Feedback on selection.
- **Data**: Initial set of ~10 funny trivia questions.

## 4. Game Mode: Heads Up (Le Frontal)
- **Logic**:
  1. Countdown to start.
  2. Listen to `deviceorientation` or `devicemotion`.
  3. Determine tilt threshold (e.g., pitch > 60 deg or < -60 deg).
  4. Up = Success, Down = Skip.
  5. Timer (60 seconds).
- **Data**: List of celebrities (Actors, Historical, Fictional).

## 5. Polish
- Transitions between screens.
- Sound effects (optional but recommended for mobile).
- Responsive layout (centered cards on desktop, full width on mobile).
