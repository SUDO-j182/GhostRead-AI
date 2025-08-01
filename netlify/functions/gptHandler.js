exports.handler = async (event) => {
  try {
    const { text } = JSON.parse(event.body);
    console.log("Input text:", text);

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are a brutally honest, emotionally intelligent relationship expert. Your job is to read text message conversations and detect red flags, gaslighting, disinterest, mixed signals, or unhealthy behavior. Use sarcasm and humor if appropriate, but always stay truthful. Rate the emotional health from 0 to 100 and explain the key signs.`
          },
          {
            role: "user",
            content: text
          }
        ]
      })
    });

    const data = await response.json();
    console.log("OpenAI response:", JSON.stringify(data, null, 2));

    if (!response.ok) {
      console.error("API call failed:", response.status, data);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        reply: data.choices?.[0]?.message?.content || "No response."
      })
    };
  } catch (err) {
    console.error("Function error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ reply: "Server error. Please try again." })
    };
  }
};

  
  
  