// CMPM 121 Refactored Code

// --- Configuration ---
/**
 * Extracted constants to replace magic strings and numbers.
 * This centralizes configuration and prevents typos.
 */
const CONFIG = {
  HEADING_TEXT: "CMPM 121 Project",
  COUNTER_SPAN_ID: "counter",
  INCREMENT_BUTTON_ID: "increment",
  DECREMENT_BUTTON_ID: "dec",
  RESET_BUTTON_ID: "reset",
  DEFAULT_COUNT: 0,
  TITLE_PREFIX: "Clicked ",
  COLOR_EVEN: "lightblue",
  COLOR_ODD: "pink",
};

// --- State ---
/**
 * Application state.
 * Renamed 'c' to 'count' for clarity.
 */
let count = CONFIG.DEFAULT_COUNT;

// --- Cached DOM Elements ---
// We cache the counter span here so 'updateUI' can access it.
let counterSpan: HTMLElement | null = null;

// --- Core Logic ---

/**
 * Updates the entire UI to reflect the current state.
 * This function was extracted using [Extract Method] to remove
 * code duplication from the original event listeners.
 */
function updateUI() {
  // Guard clause in case the span wasn't found during setup
  if (!counterSpan) return;

  // Update the counter display
  counterSpan.innerHTML = `${count}`;

  // Update the document title
  document.title = CONFIG.TITLE_PREFIX + count;

  // Change the background color based on even/odd count
  document.body.style.backgroundColor = count % 2
    ? CONFIG.COLOR_ODD
    : CONFIG.COLOR_EVEN;
}

/**
 * Event handler for incrementing the counter.
 * Logic was extracted from the original anonymous arrow function.
 */
function handleIncrement() {
  count++;
  updateUI();
}

/**
 * Event handler for decrementing the counter.
 * Logic was extracted from the original anonymous arrow function.
 */
function handleDecrement() {
  count--;
  updateUI();
}

/**
 * Event handler for resetting the counter.
 * Logic was extracted from the original anonymous arrow function.
 */
function handleReset() {
  count = CONFIG.DEFAULT_COUNT;
  updateUI();
}

/**
 * Creates the initial DOM structure for the application.
 * Extracted from the original 'setup' function to improve readability
 */
function createDOM() {
  document.body.innerHTML = `
    <h1>${CONFIG.HEADING_TEXT}</h1>
    <p>Counter: <span id="${CONFIG.COUNTER_SPAN_ID}">${CONFIG.DEFAULT_COUNT}</span></p>
    <button id="${CONFIG.INCREMENT_BUTTON_ID}">Click Me!</button>
    <button id="${CONFIG.DECREMENT_BUTTON_ID}">Decrement</button>
    <button id="${CONFIG.RESET_BUTTON_ID}">Reset</button>
  `;
}

/**
 * Queries the DOM for interactive elements and attaches event listeners.
 * Extracted from the original 'setup' function.
 * Variable names were improved (e.g., 'bI' -> 'incrementButton').
 */
function registerEventListeners() {
  // Get elements from the document
  const incrementButton = document.getElementById(CONFIG.INCREMENT_BUTTON_ID);
  const decrementButton = document.getElementById(CONFIG.DECREMENT_BUTTON_ID);
  const resetButton = document.getElementById(CONFIG.RESET_BUTTON_ID);

  // Assign the counter span to the module-level variable
  counterSpan = document.getElementById(CONFIG.COUNTER_SPAN_ID);

  // Check if any element is missing (robustness)
  if (!incrementButton || !decrementButton || !resetButton || !counterSpan) {
    console.error("Failed to find one or more required DOM elements.");
    return;
  }

  // Add click events to the buttons
  incrementButton.addEventListener("click", handleIncrement);
  decrementButton.addEventListener("click", handleDecrement);
  resetButton.addEventListener("click", handleReset);
}

/**
 * Main setup function to initialize the application.
 * This function now coordinates the setup process.
 */
function setup() {
  createDOM();
  registerEventListeners();
  updateUI(); // Set the initial UI state correctly
}

// --- Application Start ---
// Called 'setup' directly. The redundant 'start' function
// was removed using [Inline Method].
setup();
