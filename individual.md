# Individual Project: Quiz App

Build a quiz app that fetches questions from the [Open Trivia DB](https://opentdb.com/api_config.php), lets the player answer them against a timer, and shows a results screen at the end.

**Tools:** HTML, CSS, and vanilla JavaScript only. No frameworks or libraries.

**Time:** 3 days

---

## Phase 1: Setup

- [ ] Create a project folder with `index.html`, `style.css`, and `script.js`
- [ ] Build three screens in HTML: **Start**, **Quiz**, and **Results** (show only one at a time)
- [ ] Add a Start screen with a category dropdown, a difficulty dropdown, and a "Start Quiz" button

## Phase 2: Fetching Questions (Modules 14-15)

- [ ] Write an `async` function that fetches 10 questions from Open Trivia DB based on the player's chosen category and difficulty
- [ ] Check `response.ok` and the API's `response_code` field before using the data
- [ ] Show a "Loading..." message while fetching
- [ ] Show a friendly error message with a "Try again" button if the fetch fails
- [ ] Decode the HTML-encoded text (e.g. `&quot;`). Hint: add `&encode=url3986` to the URL and use `decodeURIComponent`

> **Rate limit:** the API allows about 1 request every 5 seconds per network. Fetch all 10 questions in **one** request and do not fetch again until the next game.

## Phase 3: Quiz Logic (Modules 7, 8, 9, 12, 13)

- [ ] Create a `Question` class that holds the question text, the correct answer, and all shuffled answer options
- [ ] Create a `Quiz` class that tracks the list of questions, the current question index, and the score
- [ ] Add `Quiz` methods: `getCurrentQuestion()`, `checkAnswer(answer)`, `nextQuestion()`, and `isFinished()`
- [ ] Use `map` to turn the API results into `Question` objects
- [ ] Combine the correct and incorrect answers and shuffle them so the correct answer is not always in the same spot

## Phase 4: Displaying the Quiz (Modules 10-11)

- [ ] Show the current question, its answer buttons, and a progress indicator (e.g. "Question 3 of 10")
- [ ] Create the answer buttons dynamically with JavaScript (not hard-coded in HTML)
- [ ] When the player clicks an answer, highlight it green if correct and red if wrong, and show the correct one
- [ ] Disable the answer buttons after one is clicked so the player cannot answer twice
- [ ] Add a "Next" button that moves to the next question
- [ ] Show the running score on screen

## Phase 5: Timer (Module 14)

- [ ] Add a 15-second countdown for each question using `setInterval`
- [ ] When time runs out, mark the question as wrong, reveal the correct answer, and enable "Next"
- [ ] Clear the timer correctly when the player answers or moves on (no timers left running in the background)

## Phase 6: Results Screen

- [ ] Show the final score, the percentage, and a message based on performance (use conditionals, e.g. 80% and above is "Great job!")
- [ ] Add a "Play Again" button that returns to the Start screen and resets everything
- [ ] Save the player's **best score** in `localStorage` and display it on the Start screen

## Phase 7: Polish and Debugging (Module 4)

- [ ] Style the app so it looks clean and works on both phone and desktop widths
- [ ] Make sure the "Start Quiz" button cannot be clicked twice while questions are loading

## Phase 8: Submission

- [ ] Remove unused code and leftover `console.log` statements
- [ ] Add a short `README.md` with the project title, how to run it, and one thing you would add with more time
- [ ] Submit your project link/folder before the deadline

---

## Stretch Goals (optional)

- Add a "True / False" mode
- Add sound effects or a points bonus for fast answers
- Show a review of every question with the player's answer vs. the correct one at the end
- Keep a top-5 leaderboard in `localStorage`

## Submission

- **Deadline:** 8pm on sunday 15-11-2026
- **Platform:** Slack Channel
- **Important:** Include the application screenshots in your submission folder.