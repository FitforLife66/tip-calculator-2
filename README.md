# Frontend Mentor – Tip Calculator App

This is my solution to the
[Tip calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/tip-calculator-app-ugJNGbJUX).

The goal of this project was to build a mobile-first tip calculator with proper input handling, validation and state management.

---

## Overview

### The challenge

Users should be able to:

- Calculate the correct tip and total amount per person
- Enter values safely with validated numeric input
- Use the app comfortably on mobile devices
- See formatted numbers after finishing input

---

### Links

- Solution URL: https://github.com/FitforLife66/tip-calculator
- Live Site URL: https://ffl-tip-calculator.netlify.app/

---

## My process

### Built with

- Semantic HTML5
- Tailwind CSS
- Mobile-first workflow
- React
- TypeScript

---

### What I learned

During this project I focused on **core frontend concepts**, especially around forms and state:

- **Input validation**
  - Restricting user input with regular expressions
  - Preventing invalid numeric states early
- **React state management**
  - Using functional `setState`
  - Avoiding stale state bugs
  - Keeping input state string-based
- **Separation of concerns**
  - Raw input vs. formatted display
  - Formatting on `blur`, editing on `focus`
- **TypeScript fundamentals**
  - Type narrowing with `typeof`
  - Safe handling of union types
- **Mobile-first UX**
  - Avoiding disruptive formatting while typing
  - Limiting layout width instead of forcing orientation

---

### Continued development

In future projects I want to focus more on:

- Abstracting form logic into reusable hooks
- Reducing component state through derived values
- Improving overall component structure and reusability
- Working with more complex user interactions

---

## Author

- Frontend Mentor – FitforLife66
