# Backend Viva Preparation Guide 🎓

This document allows you to master the technical details of the **Stress Management Portal** backend. Use this to prepare for your viva/interview.

---

## 1. High-Level Architecture 🏗️

### **Q: What is the architecture of this application?**

**A:** This project uses the **MERN Stack** (MongoDB, Express, React, Node.js).

- **Frontend vs Backend**: The frontend (React) is a separate client that communicates with the backend (Express) via **RESTful APIs** using JSON.
- **MVC Pattern**: We follow a modified **Model-View-Controller** pattern (technically Model-Route-Controller here since React handles the View).
  - **Models**: Database Schemas (`User.js`, `MeditationSession.js`).
  - **Controllers**: Business Logic (`authController`, `aiController`).
  - **Routes**: API Endpoints mapping URLs to controllers.

### **Q: Why did you use Node.js and Express?**

**A:**

- **Node.js**: Allows us to use JavaScript on the server, sharing the same language as the frontend (Unified Stack). It is event-driven and non-blocking, making it great for handling multiple concurrent requests (like chat).
- **Express.js**: A minimal framework that simplifies routing, middleware integration, and request handling compared to raw Node.js http modules.

---

## 2. Authentication & Security 🔐

### **Q: How does Authentication work in your app?**

**A:** We use **JWT (JSON Web Tokens)** for stateless authentication.

1.  **Register/Login**: User sends credentials. Server verifies them.
2.  **Token Generation**: If valid, server signs a JWT containing the `user_id` using a `JWT_SECRET` and sends it back.
3.  **Storage**: Frontend stores this token (usually in `localStorage` or memory).
4.  **Protected Requests**: Frontend sends the token in the `Authorization: Bearer <token>` header for subsequent requests.

### **Q: How do you protect routes?**

**A:** We use a custom **Middleware** called `protect` (in `authMiddleware.js`).

- It intercepts the request.
- Checks for the `Bearer` token in headers.
- Verifies the token using `jwt.verify()`.
- Fetches the user from DB and attaches it to `req.user`.
- Calls `next()` to proceed to the controller. If invalid, it throws a 401 Unauthorized error.

### **Q: How are passwords stored?**

**A:** passwords are **NEVER** stored in plain text.

- We use **bcryptjs** to hash passwords before saving to MongoDB.
- During login, we use `bcrypt.compare()` to check if the entered password matches the stored hash.

---

## 3. Database (MongoDB) 🗄️

### **Q: Explain your Database Schema.**

**A:** We use **MongoDB** (NoSQL) with **Mongoose**.

- **User Model**:
  - Properties: `name`, `email`, `password` (hashed).
  - **Embedded Arrays**: `schedule` (list of planned sessions) and `assessmentResults` (history of AI analysis).
- **MeditationSession Model**:
  - Properties: `title`, `audioUrl`, `duration`, `category`, `tags`.
  - Used to store the content library.

### **Q: Why MongoDB instead of SQL?**

**A:**

- **Flexibility**: Flexible schema allows us to easily add new fields (like `aiArchetype`) without complex migrations.
- **JSON-like**: Data stored as BSON maps directly to JavaScript objects, making development faster with Node.js.

---

## 4. Key Features & Logic 🧠

### **Q: How does the AI Chatbot work? (Backend Side)**

**A:** It is implemented in `aiController.js`.

- It currently uses a **Rule-Based functionality** (Simulated AI) for reliability and speed.
- **Mechanism**:
  - The `chatResponse` controller receives a `message` string.
  - It normalizes the text (lowercase) and uses **RegEx** to scan for keywords (e.g., "tired", "anxious", "work").
  - Based on the match, it selects a randomized empathetic response and constructs a `suggestion` object (link to a relevant meditation).

### **Q: How does the "Schedule" feature work?**

**A:**

- **Endpoint**: `POST /api/dashboard/schedule`
- **Logic**:
  - Accepts `day`, `time`, and `meditationId`.
  - Pushes a new object into the User's `schedule` array.
  - **Validation**: Checks if a session is already scheduled for that exact time to prevent conflicts.

---

## 5. Potential Code Questions 💻

### **Q: What is `asyncHandler`?**

**A:** It's a wrapper function that automatically catches errors in async routes and passes them to the Express error handling middleware. It removes the need to write `try-catch` blocks in every single controller function.

### **Q: What is CORS?**

**A:** **Cross-Origin Resource Sharing**.

- Since our frontend runs on port `5173` and backend on `5000`, browsers block requests by default for security.
- We use the `cors` middleware package to explicitly allow the frontend domain to access the backend API.

### **Q: Explain the `seeder.js` file.**

**A:** It is a standalone script used to initialize the database.

- It connects to MongoDB independently.
- It deletes all existing data (clean slate).
- It inserts our predefined "Starter Pack" of meditation sessions and categories so the app isn't empty on first run.

---

## 6. Common Viva Questions

1.  **"What was the most challenging part of the backend?"**
    - _Sample Answer_: "Implementing the logic to map the AI Assessment score to a specific 'Archetype' and then dynamically generating a weekly schedule based on that archetype was complex logic to handle efficiently."
2.  **"How would you scale this?"**
    - _Sample Answer_: "We could switch to a microservices architecture, cache frequent API responses (like meditation lists) using Redis, and host the heavy media files (audio) on a CDN like AWS S3 instead of local serving."
3.  **"Is the AI real?"**
    - _Sample Answer_: "It uses a deterministic Rule-Based Natural Language Processing (NLP) approach. It's designed to be safe and reliable for mental health contexts where predictable responses are safer than generative hallucinations. We can easily swap the engine for OpenAI API later."
---

_Good luck! You got this._ 🚀
