exports.handler = async (event) => {
  try {
    const { text } = JSON.parse(event.body);
    console.log("📥 Input text:", text);

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

    console.log("📡 Status Code:", response.status);
    console.log("📋 Response Headers:", [...response.headers.entries()]);
    console.log("📦 Full API Response:", JSON.stringify(data, null, 2));

    // Fallback logic: handle quota exhaustion or API errors gracefully
    if (data.error?.code === "insufficient_quota") {
      console.warn("⚠️ OpenAI quota exceeded.");
      return {
        statusCode: 200,
        body: JSON.stringify({
          reply: "🔋 GPT is currently out of juice (API quota reached). Try again soon or wait for a top-up."
        })
      };
    }

    // Return GPT reply or fallback
    return {
      statusCode: 200,
      body: JSON.stringify({
        reply: data.choices?.[0]?.message?.content || "🤖 GPT didn’t return a valid reply."
      })
    };

  } catch (err) {
    console.error("🔥 Function error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        reply: "💥 Server error. Try again later or report this bug to the dev."
      })
    };
  }
};
