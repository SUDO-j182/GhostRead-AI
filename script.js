const chatInput = document.getElementById("chat-input");
const analyseBtn = document.getElementById("analyse-btn");
const resultDiv = document.getElementById("result");

analyseBtn.addEventListener("click", () => {
  const userInput = chatInput.value.trim();

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
    } else {
      resultDiv.textContent = "Unexpected response format.";
    }

  } catch (error) {
    // Optional: You could remove this in production or gate it by DEBUG flag
    console.error("Error calling GPT function:", error);
    resultDiv.textContent = "Something went wrong. Try again later.";
  } finally {
    analyseBtn.disabled = false; // Re-enable after request
  }
}


  
  