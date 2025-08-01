const chatInput = document.getElementById('chat-input');
const analyseBtn = document.getElementById('analyse-btn');
const resultDiv = document.getElementById('result');

analyseBtn.addEventListener('click', () => {
  const userInput = chatInput.value.trim();
  if (!userInput) {
    resultDiv.textContent = "Please paste a conversation first.";
    return;
  }

  resultDiv.textContent = "Analyzing...";
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
    resultDiv.textContent = data.reply || "No response received.";

  } catch (error) {
    console.error("Error calling GPT function:", error);
    resultDiv.textContent = "Something went wrong. Try again later.";
  }
}

  
  