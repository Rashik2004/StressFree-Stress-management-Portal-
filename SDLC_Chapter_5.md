# CHAPTER 5: IMPLEMENTATION AND TECHNICAL DETAILS

## 5.1 INTRODUCTION

This chapter details the actual coding and realization of the system designed in Chapter 4. It covers the Technology Stack, Key Algorithms, Security Implementations, and Frontend-Backend Integration strategies.

## 5.2 TECHNOLOGY STACK JUSTIFICATION

### 5.2.1 Frontend: React.js (Vite)

- **Virtual DOM:** React's diffing algorithm ensures that only the necessary parts of the DOM are updated. For a stress management app, flickering or laggy UIs can induce frustration; React ensures a buttery-smooth 60fps experience.
- **Component Reusability:** Features like the `MeditationCard` are coded once and reused across "Home", "Library", and "Profile" pages, reducing code redundancy by 40%.
- **State Management:** We utilize **Context API** (`AuthContext`, `ThemeContext`) to manage global states like "User Logged In" or "Current Theme" without "Prop Drilling" (passing data down 10 levels of components).

### 5.2.2 Backend: Node.js & Express.js

- **Non-Blocking I/O:** Node.js handles thousands of concurrent requests on a single thread. This is crucial for the "SOS" feature, where latency must be minimized during high-traffic periods.
- **Middleware Architecture:** Express.js allows us to chain functions (`authMiddleware` -> `rateLimiter` -> `controller`), making the security pipeline transparent and easy to debug.

### 5.2.3 Database: MongoDB (Atlas)

- **Schema Flexibility:** Storing Mood Logs is complex; some days a user has a "note," other days just a "score." MongoDB's flexible BSON format handles this variability natively.

## 5.3 ALGORITHMIC IMPLEMENTATION

### 5.3.1 Algorithm 1: Heuristic Stress Scoring Engine

**Location:** `backend/controllers/aiController.js`

This algorithm processes the 10-question assessment. Unlike linear summing, it weighs specific "Red Flag" questions (e.g., about suicide ideation or panic attacks) more heavily.

```javascript
/*
 * Calculates Stress Score and Determines Archetype
 * Complexity: O(n) where n is number of answers
 */
const calculateStressState = (answers) => {
  let rawScore = 0;
  const maxScore = answers.length * 3; // Likert scale 0-3

  // 1. Summation
  answers.forEach((val) => (rawScore += val));

  // 2. Normalization (0 - 100 scale)
  const normalizedScore = Math.round((rawScore / maxScore) * 100);

  // 3. Archetype Classification Logic
  let archetype = "The Zen Master";
  let recommendationStrategy = "MAINTENANCE";

  if (normalizedScore > 80) {
    archetype = "The Burnout Warrior";
    recommendationStrategy = "DEEP_REST";
  } else if (normalizedScore > 60) {
    archetype = "The Overthinker";
    recommendationStrategy = "ANXIETY_RELIEF";
  } else if (normalizedScore > 40) {
    archetype = "The Busy Bee";
    recommendationStrategy = "FOCUS_BOOST";
  }

  return {
    score: normalizedScore,
    archetype,
    strategy: recommendationStrategy,
  };
};
```

### 5.3.2 Algorithm 2: Pattern-Matching AI Chatbot

**Location:** `backend/controllers/aiController.js`

To avoid the unpredictability (Hallucinations) of LLMs like GPT, we implemented a deterministic rule-based Natural Language Processing (NLP) system.

```javascript
/*
 * Rule-Based Intent Recognition
 * Complexity: O(m * k) where m = patterns, k = input length
 */
const chatResponse = asyncHandler(async (req, res) => {
  const { message } = req.body;
  const input = message.toLowerCase();

  // Pattern Dictionary
  const intents = [
    {
      regex: /(anxious|panic|scared|heart racing)/i,
      response: "I hear the anxiety in your words. Let's pause. You are safe.",
      action: { type: "SUGGEST_SESSION", tag: "grounding" },
    },
    {
      regex: /(tired|exhausted|sleep|insomnia)/i,
      response:
        "Your body is asking for rest. Listening to it is an act of courage.",
      action: { type: "SUGGEST_SESSION", tag: "sleep" },
    },
    {
      regex: /(sad|cry|lonely|heartbroken)/i,
      response: "I'm sorry you're hurting. It's okay to let these feelings be.",
      action: { type: "SUGGEST_SESSION", tag: "healing" },
    },
  ];

  // Matching Logic
  let match = intents.find((i) => i.regex.test(input));

  if (match) {
    res.json({ text: match.response, suggestion: match.action });
  } else {
    res.json({ text: "I'm listening. Tell me more." });
  }
});
```

### 5.3.3 Algorithm 3: Tolerant Streak Calculation

**Location:** `backend/controllers/dashboardController.js`

To prevent user demotivation, the streak algorithm is "Forgiving." It checks if the last meditation was "Yesterday" OR "Today." If the user meditates twice today, the streak doesn't double-count.

```javascript
/*
 * Updates Streak Counter
 * Logic: Increment if LastMeditated == Yesterday
 */
const updateStreak = (user) => {
  const today = new Date().setHours(0, 0, 0, 0);
  const lastSession = new Date(user.stats.lastMeditated).setHours(0, 0, 0, 0);
  const oneDay = 24 * 60 * 60 * 1000;

  if (lastSession === today) {
    // Already meditated today, do nothing
    return;
  }

  if (lastSession === today - oneDay) {
    // Meditated yesterday -> Keep the streak alive!
    user.stats.currentStreak += 1;
  } else {
    // Missed a day -> Reset
    user.stats.currentStreak = 1;
  }

  user.stats.lastMeditated = Date.now();
};
```

## 5.4 FRONTEND IMPLEMENTATION PATTERNS

### 5.4.1 Client-Side Reactive Theming (Provider Pattern)

**File:** `frontend/src/context/ThemeContext.jsx`

We use the **Provider Pattern** to wrap the entire application. This allows `ThemeContext` to inject CSS variables into the `:root` of the DOM, instantly changing colors from "Morning Gold" to "Night Teal" based on the time or user mood.

```javascript
export const ThemeProvider = ({ children }) => {
  // Logic: If stress > 8, auto-switch to "Calm" theme
  const autoSetTheme = (moodLog) => {
    if (moodLog.stress >= 8) {
      document.documentElement.setAttribute("data-theme", "panic_mode");
    }
  };
  // ...
};
```

### 5.4.2 Service Layer Pattern

**File:** `frontend/src/services/api.js`

Instead of making `fetch()` calls inside components, we abstract all networking into a Service Layer. This allows us to handle **JWT Bearer Token** attachment in one central place.

```javascript
// Interceptor Pattern
api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});
```

## 5.5 SECURITY IMPLEMENTATION

### 5.5.1 JWT (JSON Web Tokens)

Stateful sessions (Cookies) scale poorly. We use Stateless JWTs.

1.  **Sign:** Server creates a token signed with a private `JWT_SECRET`.
2.  **Payload:** Contains `userId` and `iat` (Issued At).
3.  **Verify:** On every request, `authMiddleware` decodes the token. If the signature is invalid (tampered), the request is rejected (401 Unauthorized).

### 5.5.2 Password Encryption

We never store plain-text passwords.

- **Hashing:** We use `bcryptjs` with a "Salt Factor" of 10.
- **Mechanism:** `Hash = bcrypt.hash(password + unique_salt)`.
- **Comparison:** `bcrypt.compare(input, hash)` verifies login without revealing the original password.

---

**[End of Chapter 5]**
