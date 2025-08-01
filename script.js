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
    const endpoint = 'https://api.openai.com/v1/chat/completions';
  
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_API_KEY_HERE'
    };
  
    const body = {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are a brutally honest, emotionally intelligent relationship expert. Your job is to read text message conversations and detect red flags, gaslighting, disinterest, mixed signals, or unhealthy behavior. Use sarcasm and humor if appropriate, but always stay truthful. Rate the emotional health from 0 to 100 and explain the key signs.`
        },
        {
          role: 'user',
          content: userText
        }
      ],
      temperature: 0.8
    };
  
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
      });
  
      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content || "No response received.";
      resultDiv.textContent = reply;
  
    } catch (error) {
      console.error(error);
      resultDiv.textContent = "Something went wrong. Try again later.";
    }
  }
  
  