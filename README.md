# Refactoring Analysis

This document details the code smells identified in `src/main.ts` and the refactoring patterns applied to improve its quality.

## 🔬 Code Smells

- **Unclear Variable Names:** Many variables had short, bad names that did not clearly communicate their purpose, making the code difficult to read.

- **Duplicated Code:** The logic for updating the UI (setting the counter's text, updating the document title, and changing the background color) was copied and pasted inside all three event listeners, violating the DRY principle.

- **Magic Strings and Numbers:** Raw string values for element IDs and CSS colors were used directly in the code, making them hard to maintain and prone to typos.

- **Long Method:** The `setup()` function violated the Single Responsibility Principle by doing too much: creating the DOM, querying for elements, and attaching all event listeners.

- **Global Variable State:** The application's core state was a mutable global variable, which is poor practice and can lead to unpredictable behavior as an application grows.

---

## 🛠️ Refactoring Patterns Applied

- **Rename Variable:** All cryptic variables were renamed to be clear and self-documenting (e.g., `c` → `count`, `bI` → `incrementButton`).
  - **Improvement:** This makes the code's intent immediately understandable without needing comments.

- **Replace Magic Literal with Symbolic Constant (Extract Constant):** All magic strings and numbers were extracted into a single, centralized `CONFIG` object.
  - **Improvement:** Centralizes configuration, prevents bugs from typos, and makes it easy to update values in one place.

- **Extract Method:** This pattern was applied in several ways:
  1. The **duplicated UI update logic** was extracted into a single `updateUI()` function.
  2. The logic inside each anonymous event listener was extracted into named handlers (e.g., `handleIncrement`).
  3. The **Long Method** `setup()` was decomposed into smaller, focused functions (`createDOM()` and `registerEventListeners()`).
  - **Improvement:** The code is now DRY, more readable, and easier to maintain. Each function has a clear, single responsibility.

- **Inline Method:** The redundant `start()` function, which only called `setup()`, was removed, and `setup()` was called directly.
  - **Improvement:** This removed an unnecessary layer of indirection, simplifying the code's execution flow.
