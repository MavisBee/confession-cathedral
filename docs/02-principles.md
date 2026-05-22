# 📐 Software Engineering Principles in Confession Cathedral

This document identifies the software engineering principles utilized in the Confession Cathedral codebase. Each principle is defined in plain language, followed by the exact file names and line numbers where it is applied.

---

## 1. Controlled Components

### 📝 Definition
In React, form elements (like text inputs, textareas, and selects) usually maintain their own internal state in the browser's DOM. A **Controlled Component** is an input element whose value is instead driven by React state. React acts as the "single source of truth" for the input, ensuring that the visual interface is always synchronized with the application state.

### 📍 Occurrence in Code
*   **File:** [`src/App.tsx`](file:///c:/Users/User1/Downloads/Dev%20final%20task%201/confession-cathedral/src/App.tsx)
    *   **Lines 14:** State initialization: `const [text, setText] = useState('')`
    *   **Lines 61–69:** Binding state to textarea:
        ```typescript
        <textarea
          className={`textarea${isOverLimit ? ' over-limit' : ''}`}
          placeholder="What weighs on your soul?"
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={4}
          maxLength={MAX_CHARS + 50}
        />
        ```
        *   `value={text}` forces the textarea to display only what is in the state.
        *   `onChange={e => setText(e.target.value)}` intercepts user key taps and updates the state.

---

## 2. Immutability

### 📝 Definition
**Immutability** means that once a piece of data (like an array or an object) is created, it cannot be modified directly. Instead of changing (mutating) the existing data structure, we create a completely new copy with the updated information. In React, this is crucial because it allows the framework to cheaply determine if data has changed (by comparing references) and trigger UI updates accurately.

### 📍 Occurrence in Code
*   **File:** [`src/App.tsx`](file:///c:/Users/User1/Downloads/Dev%20final%20task%201/confession-cathedral/src/App.tsx)
    *   **Line 29:** Updating the confession list:
        ```typescript
        setConfessions(prev => [newConfession, ...prev])
        ```
        *   Instead of modifying the existing array (e.g., `prev.push(newConfession)`), we use the spread operator (`...prev`) inside a new array literal `[...]`. This returns a new array reference containing the new confession at the front, keeping the original state immutable.

---

## 3. Lifting State

### 📝 Definition
**Lifting State** is the practice of moving state up to a common ancestor component. When multiple elements or components need to share or react to the same data, we do not let them manage their own local states independently. Instead, we define the state in their closest shared parent and pass the values or updating functions down.

### 📍 Occurrence in Code
*   **File:** [`src/App.tsx`](file:///c:/Users/User1/Downloads/Dev%20final%20task%201/confession-cathedral/src/App.tsx)
    *   **Lines 13–14:** Defining state at the root level of the `App` component:
        ```typescript
        const [confessions, setConfessions] = useState<Confession[]>([])
        const [text, setText] = useState('')
        ```
        *   The state is "lifted" to `App` so it can be shared between the input form (`<textarea>` on line 64, character counter on line 72, submit button disabled condition on line 77) and the list feed (`confessions.map(...)` on line 88).

---

## 4. Separation of Concerns (SoC)

### 📝 Definition
**Separation of Concerns** is a design pattern where a program is split into distinct sections, each handling a single responsibility or "concern". This minimizes code tangling, making the system easier to debug, refactor, and scale.

### 📍 Occurrence in Code
*   **File Structure Separation:**
    *   **Structure (HTML):** [`index.html`](file:///c:/Users/User1/Downloads/Dev%20final%20task%201/confession-cathedral/index.html) (Lines 1–16) defines the entry point markup.
    *   **Style (CSS):** [`src/index.css`](file:///c:/Users/User1/Downloads/Dev%20final%20task%201/confession-cathedral/src/index.css) (Lines 1–40) and [`src/App.css`](file:///c:/Users/User1/Downloads/Dev%20final%20task%201/confession-cathedral/src/App.css`) (Lines 1–149) define the visual theme and animations.
    *   **Logic (TypeScript/React):** [`src/main.tsx`](file:///c:/Users/User1/Downloads/Dev%20final%20task%201/confession-cathedral/src/main.tsx) (Lines 1–11) handles component mounting, while [`src/App.tsx`](file:///c:/Users/User1/Downloads/Dev%20final%20task%201/confession-cathedral/src/App.tsx) (Lines 1–101) handles application state.
*   **Logical Partitioning within `App.tsx`:**
    *   **Types/Contracts:** `interface Confession` (Lines 4–8) defines data models.
    *   **Constants:** `const MAX_CHARS = 280` (Line 10) isolates configuration values from execution logic.
    *   **Date Formatting Utility:** `getTimeAgo` (Lines 39–48) abstracts date calculations away from component rendering logic.

---

## 5. Declarative Programming

### 📝 Definition
**Declarative Programming** focuses on describing *what* the user interface should look like for a given state, rather than giving step-by-step instructions (*how*) to modify the UI (which is *imperative programming*). React handles the heavy lifting of updating the actual DOM elements based on this declaration.

### 📍 Occurrence in Code
*   **File:** [`src/App.tsx`](file:///c:/Users/User1/Downloads/Dev%20final%20task%201/confession-cathedral/src/App.tsx)
    *   **Line 62:** Conditional CSS class assignment:
        ```typescript
        className={`textarea${isOverLimit ? ' over-limit' : ''}`}
        ```
    *   **Lines 77:** Disabling the button based on logical conditions:
        ```typescript
        disabled={isEmptyOrWhitespace || isOverLimit}
        ```
    *   **Lines 85–94:** Conditional rendering of UI lists:
        ```typescript
        {confessions.length === 0 ? (
          <p className="empty-state">No confessions yet. The floor is yours.</p>
        ) : (
          confessions.map(...)
        )}
        ```
        *   Instead of manually selecting the button element and setting its `disabled` attribute to true, or appending card elements to the DOM via `.appendChild()`, we describe the output UI as a function of the variables `isOverLimit`, `isEmptyOrWhitespace`, and `confessions.length`.

---

## 6. Type Safety

### 📝 Definition
**Type Safety** is a feature of compilers and programming languages (like TypeScript) that prevents developer errors by enforcing strict types on data. It ensures that variables, function parameters, and component states conform to predetermined structural contracts, eliminating runtime errors like "cannot read property of undefined".

### 📍 Occurrence in Code
*   **File:** [`src/App.tsx`](file:///c:/Users/User1/Downloads/Dev%20final%20task%201/confession-cathedral/src/App.tsx)
    *   **Lines 4–8:** Explicit blueprint for data structure:
        ```typescript
        interface Confession {
          id: number
          text: string
          timestamp: number
        }
        ```
    *   **Line 13:** Forcing the state list to strictly contain confession objects:
        ```typescript
        const [confessions, setConfessions] = useState<Confession[]>([])
        ```
    *   **Line 23:** Declaring the variable type:
        ```typescript
        const newConfession: Confession = { ... }
        ```
    *   **Line 33:** Specifying the React Keyboard Event type:
        ```typescript
        handleKeyDown = (e: React.KeyboardEvent) => { ... }
        ```

---

## 7. Don't Repeat Yourself (DRY) / Single Source of Truth

### 📝 Definition
The **DRY** principle states that every piece of knowledge or configuration within a system must have a single, unambiguous, authoritative representation. This prevents inconsistency when making updates (e.g., updating a limit in one place but forgetting to change it in another).

### 📍 Occurrence in Code
*   **File:** [`src/App.tsx`](file:///c:/Users/User1/Downloads/Dev%20final%20task%201/confession-cathedral/src/App.tsx)
    *   **Line 10:** Defining `MAX_CHARS` once.
    *   **Lines 17, 68, 72, 77:** Reusing `MAX_CHARS` for:
        *   Length logic verification: `charCount > MAX_CHARS`
        *   Textarea physical constraints: `maxLength={MAX_CHARS + 50}`
        *   Visual count presentation: `{charCount}/{MAX_CHARS}`
        *   Disabling form submissions when limits are exceeded.

---

## 8. CSS Custom Properties (CSS Variables)

### 📝 Definition
**CSS Custom Properties** are entities defined by CSS authors that contain specific values to be reused throughout a document. They allow developers to build design systems, centralize theme configuration (like colors, sizes, and spacing), and make global visual refactoring straightforward.

### 📍 Occurrence in Code
*   **File:** [`src/index.css`](file:///c:/Users/User1/Downloads/Dev%20final%20task%201/confession-cathedral/src/index.css)
    *   **Lines 1–16:** Declaring design system variables inside the root node:
        ```css
        :root {
          --bg: #0f0d15;
          --bg-card: #1a1723;
          --accent: #a78bfa;
          --danger: #f87171;
          --sans: 'Inter', system-ui, -apple-system, sans-serif;
          ...
        }
        ```
*   **File:** [`src/App.css`](file:///c:/Users/User1/Downloads/Dev%20final%20task%201/confession-cathedral/src/App.css)
    *   **Lines 27, 42, 67, 93:** Referencing variables:
        *   `color: var(--text-heading);`
        *   `background: var(--bg-card);`
        *   `color: var(--danger);`
        *   `background: var(--accent);`
