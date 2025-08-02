# 👻 GhostRead-AI

**GhostRead-AI** is a brutally honest, GPT-powered web tool that scans pasted conversations — like text messages with an ex — and exposes red flags, gaslighting, emotional manipulation, and mixed signals in seconds.

You paste. It reads. You get the truth.

---

## 🚀 Live Demo

👉 [https://ghostread-ai.netlify.app](https://ghostread-ai.netlify.app)

---

## 🧠 What It Does

GhostRead-AI uses OpenAI's GPT-3.5 Turbo to:

- Detect emotional manipulation, deflection, or gaslighting  
- Highlight red flags and unhealthy communication patterns  
- Assign a relationship health rating (0–100)  
- Return a sarcastic but honest emotional breakdown

It's like therapy — if your therapist had zero filter.

---

## 🛠️ Tech Stack

| Component | Tech |
|----------|------|
| Frontend | HTML / CSS / JavaScript |
| Backend  | Netlify Functions |
| AI       | OpenAI GPT-3.5 Turbo |
| Deploy   | Netlify |
| VCS      | Git + GitHub |

---

## 🔐 Security

- OpenAI API key is securely stored in Netlify env vars  
- Backend input is type-checked, length-limited, and character-sanitized  
- Frontend input is filtered and rate-limited  


---

## 📁 Folder Structure

```
/
├── index.html
├── style.css
├── script.js
├── favicon.ico
└── netlify/
    └── functions/
        └── gptHandler.js
```

---

## 🧪 Local Setup

To clone and test this project locally:

```bash
git clone https://github.com/YOUR_USERNAME/GhostRead-AI.git
cd GhostRead-AI
```

Create a `.env` file in the root with:

```env
OPENAI_API_KEY=your-api-key-here
DEBUG_MODE=false
```

Then deploy using Netlify CLI or your preferred host.



## ✨ Credits

Built by **Jai Drakulic**  
Frontend, backend, and GPT integration completed in under 6 hours.  
Pixel-perfect favicon and UI by Jai’s own custom editor.

---

> “See what they meant — not what they said.”

---

# LICENSE

Copyright (c) 2025 SUDO-j182

All rights reserved.

This software is proprietary and confidential. Unauthorized copying, redistribution, use, or modification of this code, in whole or in part, is strictly prohibited without express written permission from the author.

This repository is provided for demonstration, transparency, and portfolio purposes only. Commercial use of this codebase is not permitted without a separate agreement.


