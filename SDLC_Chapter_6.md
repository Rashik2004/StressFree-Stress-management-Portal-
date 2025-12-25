# CHAPTER 6: TESTING AND VALIDATION

## 6.1 INTRODUCTION

Software testing is a critical phase in the SDLC ensuring the system matches requirements and is defect-free. For the Stress Management Portal, testing was paramount due to the sensitive nature of the data (mental health logs) and the requirement for a calming, bug-free user experience.

## 6.2 TESTING STRATEGIES

### 6.2.1 Unit Testing

Tests individual components in isolation.

- **Tools:** Jest (Backend), React Testing Library (Frontend).
- **Scope:** Testing the `calculateStressScore` function to ensure it correctly normalizes inputs. Testing `authMiddleware` to ensure it blocks requests without tokens.

### 6.2.2 Integration Testing

Tests the interface between units.

- **Tools:** Postman, Supertest.
- **Scope:** Verifying that the `Dashboard` correctly fetches data from the `User` database model via the `API` Controller.

### 6.2.3 System Testing (End-to-End)

Tests the complete flow from a user perspective.

- **Tools:** Manual testing on Chrome/Safari.
- **Scope:** A user Registering -> Taking Assessment -> Seeing Results -> Playing Audio -> Logging Mood.

## 6.3 TEST CASES AND RESULTS

### 6.3.1 Module: Authentication

| Test ID   | Test Case                     | Steps                                                  | Expected Result                                            | Actual Result | Status   |
| :-------- | :---------------------------- | :----------------------------------------------------- | :--------------------------------------------------------- | :------------ | :------- |
| **TC-01** | **User Registration (Valid)** | 1. Enter Name, Email, Password.<br>2. Click 'Sign Up'. | Account created, JWT Token issued, Redirect to Assessment. | As Expected   | **PASS** |
| **TC-02** | **Duplicate Email**           | 1. Enter existing email.<br>2. Click 'Sign Up'.        | Error: "User already exists".                              | As Expected   | **PASS** |
| **TC-03** | **Login (Invalid Password)**  | 1. Enter valid email.<br>2. Enter wrong password.      | Error: "Invalid credentials" (401).                        | As Expected   | **PASS** |
| **TC-04** | **Token Persistence**         | 1. Refresh page after login.                           | User stays logged in (Token in LocalStorage).              | As Expected   | **PASS** |

### 6.3.2 Module: Assessment & AI

| Test ID   | Test Case                             | Steps                                                   | Expected Result                                  | Actual Result                | Status   |
| :-------- | :------------------------------------ | :------------------------------------------------------ | :----------------------------------------------- | :--------------------------- | :------- |
| **TC-05** | **Calculate Archetype (High Stress)** | 1. Select '4/4' for all stress questions.<br>2. Submit. | Score > 80, Archetype: "Burnout Warrior".        | Score: 92, "Burnout Warrior" | **PASS** |
| **TC-06** | **Empty Submission**                  | 1. Leave form blank.<br>2. Submit.                      | Validation Error: "Please answer all questions". | As Expected                  | **PASS** |
| **TC-07** | **Race Condition**                    | 1. Rapidly click 'Submit' 5 times.                      | Only 1 DB write, No duplicate logs.              | As Expected                  | **PASS** |

### 6.3.3 Module: Dashboard & Player

| Test ID   | Test Case                            | Steps                                               | Expected Result                             | Actual Result | Status   |
| :-------- | :----------------------------------- | :-------------------------------------------------- | :------------------------------------------ | :------------ | :------- |
| **TC-08** | **Time-Adaptive Greeting (Morning)** | 1. System time: 09:00 AM.<br>2. Load Dashboard.     | Greeting: "Good Morning", Theme: Gold.      | As Expected   | **PASS** |
| **TC-09** | **Audio Playback**                   | 1. Click Play on Meditation.<br>2. Pause after 10s. | Audio stops immediately.                    | As Expected   | **PASS** |
| **TC-10** | **Streak Update**                    | 1. Complete Session.<br>2. Check Stats.             | Streak increments +1, Total Min increments. | As Expected   | **PASS** |

## 6.4 PERFORMANCE TESTING

Using Google Lighthouse and Chrome DevTools Network Tab, we simulated load conditions.

- **First Contentful Paint (FCP):** 0.8s (Excellent).
- **Time to Interactive (TTI):** 1.2s.
- **API Latency:** Average response time for `GET /dashboard` is 140ms.
- **Bundle Optimization:** The final build size was reduced from 2.4MB to 450KB by implementing Lazy Loading for the `Assessment` and `Profile` routes.

## 6.5 SECURITY TESTING

1.  **SQL Injection:** Not applicable (NoSQL), but NoSQL Injection attempts (e.g., `{"$gt": ""}`) were blocked by Mongoose Schema validation.
2.  **XSS (Cross-Site Scripting):** React escapes all data by default, preventing script injection in the "Journal" notes field.
3.  **Brute Force:** The implemented Rate Limiter blocks IPs after 100 requests in 15 minutes, mitigating brute force login attempts.

---

**[End of Chapter 6]**
