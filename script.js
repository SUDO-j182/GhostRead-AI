const chatInput = document.getElementById("chat-input");
const analyseBtn = document.getElementById("analyse-btn");
const resultDiv = document.getElementById("result");

// Optional: display free use counter
const usageDisplay = document.getElementById("usage-remaining");

// FREE USAGE TRACKING
const MAX_FREE_USES = 5;
let usageCount = parseInt(localStorage.getItem("ghostread-usage") || "0");
let isPaid = localStorage.getItem("ghostread-paid") === "true";

updateUsageDisplay();

analyseBtn.addEventListener("click", () => {
  const userInput = chatInput.value.trim();

  // FREE USE LIMIT CHECK
  if (!isPaid && usageCount >= MAX_FREE_USES) {
    resultDiv.textContent = "🚫 You've reached your free usage limit.\nClick 'Upgrade' to unlock unlimited access.";
    return;
  }

  // Basic input sanitation
  if (!userInput) {
    resultDiv.textContent = "Please paste a conversation first.";
    return;
  }

  if (userInput.length > 4000) {
    resultDiv.textContent = "⚠️ Your input is too long. Please limit it to 4000 characters.";
    return;
  }

  if (/[\u0000-\u001F\u007F]/.test(userInput)) {
    resultDiv.textContent = "⚠️ Input contains control characters or invalid symbols.";
    return;
  }

  resultDiv.textContent = "Analyzing...";
  analyseBtn.disabled = true; // Prevent button spam
  callGPT(userInput);
});

async function callGPT(userText) {
  try {
    const response = await fetch("/.netlify/functions/gptHandler", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: userText })
    });

    const data = await response.json();

    if (typeof data.reply === "string") {
      resultDiv.textContent = data.reply;

      // Increment usage if free tier
      if (!isPaid) {
        usageCount++;
        localStorage.setItem("ghostread-usage", usageCount.toString());
        updateUsageDisplay();
      }

    } else {
      resultDiv.textContent = "Unexpected response format.";
    }

  } catch (error) {
    console.error("Error calling GPT function:", error);
    resultDiv.textContent = "Something went wrong. Try again later.";
  } finally {
    analyseBtn.disabled = false;
  }
}

function updateUsageDisplay() {
  if (!usageDisplay) return;
  if (isPaid) {
    usageDisplay.textContent = "✅ Unlimited Access";
  } else {
    const remaining = Math.max(0, MAX_FREE_USES - usageCount);
    usageDisplay.textContent = `🕓 Free Uses Left: ${remaining}`;
  }
}



  
  