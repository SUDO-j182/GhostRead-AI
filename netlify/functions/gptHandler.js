exports.handler = async (event) => {
  try {
    // Parse input
    const { text } = JSON.parse(event.body);

    // ✅ Validate input
    if (typeof text !== "string" || text.trim().length === 0 || text.length > 4000) {
      return {
        statusCode: 400,
        body: JSON.stringify({ reply: "❌ Invalid or oversized input." })
      };
    }

    // ✅ Sanitize invisible/invalid characters
    if (/[\u0000-\u001F\u007F]/.test(text)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ reply: "❌ Input contains control characters." })
      };
    }

    // ✅ Optional debug logging flag
    const DEBUG = process.env.DEBUG_MODE === "true";

    if (DEBUG) {
      console.log("📥 Input text:", text);
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
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

    // ✅ Log status only if debugging
    if (DEBUG) {
      console.log("📡 Status Code:", response.status);
      console.log("📋 Response Headers:", [...response.headers.entries()]);
      console.log("📦 Full API Response:", JSON.stringify(data, null, 2));
    }

    // ✅ Handle quota exhaustion or known API errors
    if (data.error?.code === "insufficient_quota") {
      return {
        statusCode: 200,
        body: JSON.stringify({
          reply: "🔋 GPT is currently out of juice (API quota reached). Try again soon or wait for a top-up."
        })
      };
    }

    if (!data.choices?.[0]?.message?.content) {
      return {
        statusCode: 502,
        body: JSON.stringify({
          reply: "🤖 GPT didn’t return a valid reply."
        })
      };
    }

    // ✅ Return clean reply
    return {
      statusCode: 200,
      body: JSON.stringify({
        reply: data.choices[0].message.content
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

