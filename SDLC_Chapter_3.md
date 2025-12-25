# CHAPTER 3: SYSTEM ANALYSIS AND REQUIREMENTS

## 3.1 INTRODUCTION

The System Analysis phase focuses on understanding the specific needs of the users and translating them into technical requirements. This allows for a structured development process where every feature maps back to a validated user need.

## 3.2 USER PROFILING AND PERSONAS

To ensure the portal resonates with its target audience, we developed three primary personas based on the demographics identified in Section 1.

### 3.2.1 Persona A: The Stressed Student ("Riya")

- **Age:** 21
- **Occupation:** Engineering Student (Final Year)
- **Pain Point:** Faces severe anxiety during exam seasons; suffers from insomnia due to late-night studying. Cannot afford therapy.
- **Goal:** Needs quick (5-10 min) anxiety relief tools and "Focus" music to help study.
- **System Need:** Mobile-responsive design, free access, "Exam Stress" category.

### 3.2.2 Persona B: The Burned-out Developer ("Arjun")

- **Age:** 28
- **Occupation:** Senior Backend Engineer
- **Pain Point:** Works 12+ hours a day, sedentary lifestyle, high cognitive load, prone to cynicism about "fluffy" self-help.
- **Goal:** Wants data-driven insights ("Show me my stress levels dropped") and efficient, scientific relaxation methods.
- **System Need:** Dark mode (eye strain), Statistics dashboard, API-like efficiency in navigation.

### 3.2.3 Persona C: The Busy Parent ("Meera")

- **Age:** 35
- **Occupation:** Marketing Manager & Mother of two
- **Pain Point:** Juggles work and home; feels constantly overwhelmed ("Mental Load"). Has zero free time.
- **Goal:** Needs "micro-interventions" (2-minute breathing) she can do in the car or bathroom.
- **System Need:** "SOS" Mode, simple UI, immediate start (no long onboarding).

## 3.3 USE CASE ANALYSIS

### 3.3.1 High-Level Use Case Diagram (Textual Representation)

The system interactions can be modeled as follows:

- **Actor: Guest User**

  - UC1: View Landing Page features.
  - UC2: Register/Sign Up.
  - UC3: View "About Us" and "Contribution" pages.

- **Actor: Registered User**

  - UC4: Log In (Authentication).
  - UC5: Complete Daily Assessment (Questionnaire).
  - UC6: Receive AI Recommendations (View Dashboard).
  - UC7: Play Meditation Session (Audio/Video).
  - UC8: Log Mood/Journal Entry.
  - UC9: View Progress Statistics (Graphs).
  - UC10: Update Profile Settings.

- **Actor: Administrator**
  - UC11: Seed Database with new content.
  - UC12: Manage User Accounts (Ban/Direct).

### 3.3.2 Detailed Use Case Descriptions

**Use Case 5: Complete Daily Assessment**

- **Pre-condition:** User is logged in.
- **Trigger:** User clicks "Check-in" or is prompted upon first login of the day.
- **Main Flow:**
  1.  System presents a form with 5-10 Likert scale questions (e.g., "How overwhelmed do you feel?").
  2.  User selects options.
  3.  User clicks "Submit".
  4.  System calculates `StressScore`.
  5.  System determines `Archetype` and saves to DB.
  6.  System redirects to Dashboard with updated recommendations.
- **Post-condition:** User schedule is populated for the next 5 sessions.

**Use Case 7: Play Meditation Session**

- **Pre-condition:** Dashboard is loaded.
- **Main Flow:**
  1.  User clicks on a recommended card (e.g., "Deep Sleep").
  2.  System opens the Player Modal.
  3.  System streams audio from CDN.
  4.  User listens to completion.
  5.  System sends `updateStats` API call.
  6.  System increments `currentStreak` and `totalMinutes`.
- **Alternate Flow:** User closes player early. System does not update stats.

## 3.4 SYSTEM REQUIREMENTS SPECIFICATION (SRS)

### 3.4.1 Functional Requirements (F.R.)

**FR-1: Authentication Module**

- FR-1.1: The system shall allow users to register with Name, Email, Password, and optional Demographics.
- FR-1.2: The system shall encrypt passwords using Bcrypt before storage.
- FR-1.3: The system shall issue a JSON Web Token (JWT) upon successful login, valid for 30 days.

**FR-2: Assessment Engine**

- FR-2.1: The system shall provide a multi-step form for stress assessment.
- FR-2.2: The backend shall process answers using a weighted sum algorithm to output a score (0-100).
- FR-2.3: Scores >80 shall trigger the "Burnout Warrior" profile and "Deep Rest" recommendations.

**FR-3: Content Delivery**

- FR-3.1: The dashboard shall display 3 "Daily Picks" based on the user's archetype and current time.
- FR-3.2: If the time is < 12:00 PM, suggestions shall prioritize "Focus" and "Energy".
- FR-3.3: If the time is > 5:00 PM, suggestions shall prioritize "Sleep" and "Unwind".

**FR-4: Progress Tracking**

- FR-4.1: The system shall calculate a "Streak" based on consecutive days of activity.
- FR-4.2: The system shall visualize "Mood Trends" over the last 7 days using a line graph.

### 3.4.2 Non-Functional Requirements (N.F.F.)

**NFR-1: Performance**

- The "Time to First Byte" (TTFB) for the dashboard API shall be under 200ms.
- The application bundle size shall be optimized (<500KB initial load) for performance on 4G networks.

**NFR-2: Security**

- All API endpoints (except Login/Register) shall be protected via Middleware verifying the JWT Bearer signature.
- The system shall implement Rate Limiting (100 req/15min) to prevent DDoS attacks.
- Cross-Origin Resource Sharing (CORS) shall be restricted to the specific frontend domain.

**NFR-3: Usability (Accessibility)**

- The UI shall meet WCAG 2.1 AA standards for contrast ratios (e.g., text on pastel backgrounds).
- Interactive elements shall have a minimum touch target size of 44x44px.

**NFR-4: Scalability**

- The backend shall be stateless, allowing for horizontal scaling across multiple server instances (e.g., Render/AWS instances).
- Database queries involving user logs shall be indexed by `userId` and `date` to maintain O(log n) retrieval times as data grows.

---

**[End of Chapter 3]**
