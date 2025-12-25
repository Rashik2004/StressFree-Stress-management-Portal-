# **Stress Management Portal: Comprehensive SDLC Report**

---

## **1. Introduction**

### **1.1 Project Overview**

The **Stress Management Portal** is a web-based digital intervention platform designed to help users identify, manage, and reduce daily stress through personalized tools. Unlike generic meditation apps, this portal utilizes a **heuristic-based AI assessment engine** to categorize users into specific stress archetypes and delivers tailored content—ranging from guided meditations to breathing exercises and cognitive reframing techniques.

### **1.2 Problem Statement**

- **Lack of Personalization:** Existing tools offer "one-size-fits-all" content that fails to address specific user needs (e.g., student exam anxiety vs. corporate burnout).
- **High Attrition:** Users abandon mental health apps due to a lack of immediate, tangible value or engagement.
- **Accessibility:** Scientific stress management techniques are often locked behind expensive therapy or complex academic jargon.

### **1.3 Objectives**

1.  **Personalize Care:** Use a rule-based AI engine to assess user stress levels and recommend specific interventions.
2.  **Increase Engagement:** Implement gamification (streaks, badges, visual progress) to motivate consistent practice.
3.  **Ensure Privacy:** Deploy robust security measures (JWT, Bcrypt) to protect sensitive mental health data.
4.  **Calming Design:** Utilize a "psychologically safe" UI/UX with soft palettes (Pastel Peach, Mint, Lavender) to reduce cognitive load.

---

## **2. Requirement Analysis**

### **2.1 Target Audience**

- **Students:** Facing exam pressure and future anxiety.
- **Software Engineers:** High cognitive load, burnout, sedentary lifestyle.
- **Corporate Employees:** Time management stress, work-life balance issues.
- **General Public:** Seeking better sleep and daily anxiety management.

### **2.2 Functional Requirements**

- **User Management:** Secure registration, login, and profile management.
- **Assessment Module:** A questionnaire to evaluate current stress levels and determining user "Archetype".
- **Content Library:** A repository of categorized audio/video sessions (Meditation, Breathing, Sleep).
- **Recommendation Engine:** Automatically suggests content based on assessment results.
- **Progress Tracking:** Dashboard displaying mood trends, streaks, and completed minutes.
- **AI Chatbot:** A rule-based conversational agent for immediate emotional support.

### **2.3 Non-Functional Requirements**

- **Performance:** Load time < 2 seconds for core pages.
- **Security:** Encryption of passwords and secure session handling.
- **Scalability:** Ability to handle concurrent users via stateless API design.
- **Responsiveness:** Fully functional on Mobile (360px+) and Desktop (1920px+) viewports.

---

## **3. System Design**

### **3.1 Architecture Diagram**

The system follows a typical **MVC (Model-View-Controller)** pattern within a **MERN Stack** architecture:

- **Frontend (View):** React.js + Tailwind CSS (SPA)
- **Backend (Controller):** Node.js + Express.js (REST API)
- **Database (Model):** MongoDB (NoSQL Data Store)

```mermaid
graph TD
    Client[Client (React SPA)] <-->|REST API (JSON)| Server[Express Server]
    Server <-->|Mongoose ODM| DB[(MongoDB Atlas)]
    Server -->|Auth Middleware| Auth[JWT Service]
    Server -->|AI Controller| Logic[Heuristic Engine]
```

### **3.2 Database Schema (MongoDB)**

**`User` Collection:**
| Field | Type | Description |
| :--- | :--- | :--- |
| `_id` | ObjectId | Primary Key |
| `name` | String | Full Name |
| `email` | String | Unique Identifier (Indexed) |
| `password` | String | Bcrypt Hashed String |
| `stressTriggers` | Array<String> | Triggers identified during onboarding |
| `assessmentResults` | Object | Stores `stressScore` (0-100) and `archetype` |
| `schedule` | Array<Object> | 5-day generated meditation plan |
| `stats` | Object | `totalMinutes`, `currentStreak` |

**`MeditationSession` Collection:**
| Field | Type | Description |
| :--- | :--- | :--- |
| `title` | String | Session Name |
| `category` | String | e.g., "Deep Rest", "Anxiety", "Focus" |
| `duration` | Number | Length in seconds |
| `audioUrl` | String | Link to CDN/S3 resource |

### **3.3 Algorithms & Logic**

#### **A. Stress Scoring Algorithm (Heuristic)**

Located in: `backend/controllers/aiController.js`
Based on the user's questionnaire responses (scale 0-3), a normalized stress score is calculated.

```javascript
// Psuedocode
Let totalScore = Sum(user_answers)
Let maxPossible = answer_count * 3
StressScore = (totalScore / maxPossible) * 100
```

#### **B. User Archetype Classification**

The system classifies users into archetypes to tailor recommendations:

| Stress Score | Archetype           | Characteristics                                          |
| :----------- | :------------------ | :------------------------------------------------------- |
| **80 - 100** | The Burnout Warrior | Severe exhaustion, needs "Deep Rest" & Sleep content.    |
| **61 - 80**  | The Overthinker     | High anxiety, racing thoughts, needs "Grounding" work.   |
| **41 - 60**  | The Busy Bee        | Moderate stress, time-poor, needs <10m "Focus" sessions. |
| **0 - 40**   | The Zen Master      | Low stress, needs "Maintenance" & "Growth" content.      |

#### **C. Content Recommendation Engine**

The engine queries the `MeditationSession` database based on the determined Archetype.

- **Logic:**
  - If Archetype == "Burnout Warrior" -> `SELECT * FROM Sessions WHERE category = 'Deep Rest'`
  - If Archetype == "Overthinker" -> `SELECT * FROM Sessions WHERE category = 'Anxiety'`
  - If Archetype == "Busy Bee" -> `SELECT * FROM Sessions WHERE duration < 600` (Short sessions)

#### **D. AI Chatbot Pattern Matching**

The chatbot uses a **keyword-spotting algorithm** (RegExp) to identify user intent and provide empathetic, pre-validated responses. This prevents AI hallucinations and ensures safe advice.

- **Pattern:** `/(anxious|panic|scared)/i` -> **Response:** "I hear the anxiety in your words. Let's pause. You are safe in this moment." + **Suggest:** "5-Minute Grounding".

#### **E. Time-Adaptive Interface Logic**

Located in `dashboardController.js`, this logic continuously adapts the UI and recommendations based on the user's local time:

- **Morning (< 12:00):** Theme: `Theme.Morning` (Gold/Teal), Suggests: "Breathing Meditation" (Focus).
- **Afternoon (12:00-17:00):** Theme: `Theme.Day` (Green), Suggests: "Guided Meditation" (Reset).
- **Evening (> 17:00):** Theme: `Theme.Night` (Dark Teal), Suggests: "Body Scan" (Sleep Prep).

#### **F. Real-Time Mood Adaptation**

Unlike static archetypes, this algorithm adapts to the _immediate_ needs of the user based on daily logs:

- **Input:** User mood ("Bad", "Terrible") -> **Action:** Fetch sessions tagged `['emotional', 'healing']`.
- **Input:** High Stress (>= 7/10) -> **Action:** Override all suggestions with `['panic', 'calm']` interventions.

#### **G. Gamification & Streak Algorithm**

To maximize engagement, the system uses a tolerant streak calculation logic:

1.  **Check:** Compare `lastMeditated` date with `Today` and `Yesterday`.
2.  **Logic:**
    - If `lastMeditated` == `Yesterday`: **Increment Streak**.
    - If `lastMeditated` < `Yesterday`: **Reset Streak to 1**.
    - If `lastMeditated` == `Today`: **No Change (Already counted)**.

#### **H. Client-Side Reactive Theming**

Located in `ThemeContext.jsx`, this logic allows the frontend to instantly react to user physiological states by changing the entire color palette:

- **Stress >= 8 (Panic):** Switches to 'Minimal Grounding' theme (reduces sensory noise).
- **Stress >= 6 (High):** Switches to 'Deep Calm' theme (darker, soothing colors).
- **Mood 'Bad' (Low):** Switches to 'Warm Support' theme (comforting warm tones).

---

## **4. Implementation Details**

### **4.1 Technology Stack**

- **Frontend:** React (Vite), Framer Motion (Animations), Tailwind CSS (Styling), Axios (API Client).
- **Backend:** Node.js, Express.js, Mongoose (ODM), Dotenv (Config).
- **Security:** JSON Web Tokens (JWT) for stateless auth, Bcrypt for password hashing.
- **DevOps:** Git for version control.

### **4.2 Design Patterns Used**

1.  **MVC (Model-View-Controller):** Separates data (Mongoose Models), logic (Controllers), and interface (React Components).
2.  **Service Layer Pattern:** Frontend API calls are abstracted into services (`authService`, `dashboardService`) that manually attach the `Bearer Token` to protected requests.
3.  **Provider Pattern (Context API):** Uses `ThemeContext` and `AuthContext` to manage global state (User, Theme) across the component tree without prop-drilling.
4.  **Singleton:** Database connection instance is shared across the application.
5.  **Middleware Chain:** Used for `protect` (Auth), Error Handling, and Logging in Express.
6.  **Observer/Pub-Sub:** React `useEffect` hooks subscribe to state changes to trigger UI updates.

### **4.3 Key Components**

- **`HeroSection.jsx`**: Responsive landing page with Grid/Flexbox layout.
- **`Contribution.jsx`**: Open-source community engagement page urging users to Donate, Code, or Mentor.
- **`AssessmentPage.jsx`**: Multi-step form with race-condition handling logic.
- **`Loader.jsx`**: Custom Framer Motion component for visual feedback.

---

## **5. Testing Strategy**

### **5.1 Unit Testing**

- **Backend:** Testing API endpoints (POST /login, GET /me) using Postman/Jest.
- **Validation:** verifying input sanitization (Email regex, Password length).

### **5.2 Integration Testing**

- **Flow Test:** User Sign Up -> Complete Assessment -> Generate Plan -> Dashboard Display.
- **DB Connection:** Verifying MongoDB Atlas connectivity and timeout handling.

### **5.3 User Acceptance Testing (UAT)**

- **Responsiveness:** Tested on Chrome DevTools (Mobile/Tablet/Desktop).
- **Usability:** Verified that "Call to Action" buttons are visible (e.g., fixed Signup button clipping issue).

---

## **6. Deployment & Maintenance**

### **6.1 Deployment Pipeline**

1.  **Database:** Hosted on **MongoDB Atlas** (Cloud).
2.  **Backend API:** Deployed on **Render** (Web Service).
    - _Env Vars:_ `MONGO_URI`, `JWT_SECRET`, `NODE_ENV`.
3.  **Frontend:** Deployed on **Vercel**.
    - _Env Vars:_ `VITE_API_URL`.

### **6.2 Maintenance Plan**

- **Monitoring:** Use Google Analytics (gtag.js) for user traffic analysis.
- **Error Logging:** Console logs in dev, rigorous try-catch blocks in production controllers.
- **Updates:** Weekly content updates to the `MeditationSession` collection (via Seeder or CMS).

---

## **7. Conclusion**

The Stress Management Portal successfully bridges the gap between technology and mental wellness. By combining **algorithmic personalization** with a **calming, accessible design**, it offers a robust solution for modern stress management. The implementation of specific design patterns like **JWT Authentication** and **Heuristic Logic** ensures the platform is both secure and intelligent, meeting the complex needs of its diverse user base.
