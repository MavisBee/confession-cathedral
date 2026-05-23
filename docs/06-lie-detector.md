# 🕵️‍♂️ 06 — Lie Detector

I asked the AI to generate five statements about how the `confession-cathedral` application works, with four of them being true and one of them being false.

Here are the five statements provided:

1. **Statement 1**: The application uses React's default text rendering syntax `{confession.text}` inside JSX, which automatically escapes user input and prevents simple Cross-Site Scripting (XSS) attacks.
2. **Statement 2**: The `<textarea>` component has its `maxLength` set to `330` (which is `MAX_CHARS + 50`), allowing the user to type slightly beyond the 280-character limit so the UI can display a red error counter.
3. **Statement 3**: The app uses React's `useEffect` hook to synchronize the state of confessions with local storage, ensuring that the confessions persist even if the browser tab is closed or reloaded.
4. **Statement 4**: When a user submits a confession, the app prepends the new confession object to the top of the existing array by using the spread operator (`[newConfession, ...prev]`).
5. **Statement 5**: The custom keyboard shortcut handler listens to `KeyDown` events and triggers submission only when the user presses `Enter` while holding the `Ctrl` or `Cmd` key.

---

## Identifying the Lie
I identified **Statement 3** as the lie.

### How I Spotted It
To verify these statements, I examined [src/App.tsx]
- I noticed that the imports only include `useState` from the `'react'` library:
  ```typescript
  import { useState } from 'react'
  ```
- There is no import or use of the `useEffect` hook anywhere in the entire file.
- The `confessions` state is initialized as an empty array:
  ```typescript
  const [confessions, setConfessions] = useState<Confession[]>([])
  ```
- There is absolutely no code interacting with local storage (`localStorage` or `sessionStorage`). Therefore, the list of confessions exists purely in the React component's in-memory state and is lost immediately upon refreshing the page.

---

## The AI's Revelation
The AI confirmed that **Statement 3** is indeed the lie. The application does not persist confessions across page reloads.
