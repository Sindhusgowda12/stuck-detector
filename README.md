<div align="center">
  <h1>🧠 Stuck Detector</h1>
  <p><b>Identify the block, clear the path.</b></p>
</div>

---

## 📌 About the Project

**Stuck Detector** is an AI-powered web application that helps users understand **why they are stuck** (in coding, learning, or any task) and provides **clear, step-by-step guidance** to move forward.

Instead of acting like a simple chatbot, the app:
- Analyzes the user’s problem
- Identifies the type of block (clarity gap, motivation gap, knowledge gap, etc.)
- Suggests structured, actionable next steps

This makes it more of a **problem diagnosis and guidance system** rather than just a Q&A tool.

---

## 🚀 Features

- AI-powered problem analysis using **Google Gemini API**
- Detects the type of “block” the user is facing
- Provides structured solutions and next steps
- Clean and simple user interface
- Works for both coding and non-coding problems
- Runs locally using Vite + React

---

## 🛠 Tech Stack

- React + TypeScript  
- Vite  
- Tailwind CSS  
- Google Gemini API (via Google AI Studio)  
- Node.js  

---

## ⚙️ How It Works

1. User enters what they are stuck on  
2. The app sends the input to the Gemini API  
3. The AI analyzes the problem  
4. The app displays:
   - Diagnosis result  
   - Why the user is stuck  
   - Step-by-step guidance to move forward  

**Flow:**  
User Input → AI Analysis → Diagnosis → Action Plan

---

## ▶️ Run Locally

### Prerequisites
- Node.js installed

### Steps

1. Install dependencies:
```bash
npm install

2. Create or edit .env.local and add your API key:

VITE_GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE


3. Start the development server:

npm run dev


4. Open in your browser:

http://localhost:3000
