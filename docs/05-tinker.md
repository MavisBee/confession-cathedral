# 🛠️ 05 — Tinker

## Submission Handler Function
In the `confession-cathedral` application, the function responsible for handling the submission of confessions is `handleSubmit` located in [App.tsx].

```typescript
  const handleSubmit = () => {
    if (isEmptyOrWhitespace || isOverLimit) return

    const newConfession: Confession = {
      id: Date.now(),
      text: text.trim(),
      timestamp: Date.now(),
    }

    setConfessions(prev => [newConfession, ...prev])
    setText('')
  }
```

---

## My Prediction
I predict that if I remove the empty submission check (`isEmptyOrWhitespace`) from both the submission handler `handleSubmit` and the submit button's `disabled` attribute, the following will happen:

1. **Submission Bypass**: The application will no longer prevent the form from submitting when the text area is empty or contains only whitespace.
2. **State Pollution**: A new confession object will be created with an empty string `""` as its `text` property and added to the `confessions` list.
3. **Empty Card Rendering**: The feed will render a new confession card for the empty confession. Since the text is empty, the card will display as a styled but blank container, only showing the relative timestamp (e.g., "just now").
4. **Layout/UX Impact**: The empty cards will accumulate in the feed, creating visual gaps in the layout since there is no minimum height or placeholder text forced on the card's content area if it is empty.

---

## Actual Results
After removing the empty submission checks from `App.tsx` and running the application, I performed the following steps to test the behavior:

1. I loaded the app in the browser.
2. I verified that the **"Confess"** button was fully enabled even when the textarea was completely blank.
3. I clicked the **"Confess"** button while the text area remained empty.

### Observations
- **Successful Submission**: The empty form submitted without throwing any validation warnings or errors.
- **Feed Rendering**: A new card was prepended to the confession list in the feed.
- **Empty Card Structure**: The card was generated with an empty `<p class="confession-text"></p>` element and a `<span class="confession-time">just now</span>` timestamp element.
- **Visual Appearance**: The blank confession appeared in the UI as a styled card container containing only the "just now" timestamp, leaving the content area completely blank.