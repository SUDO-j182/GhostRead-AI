exports.handler = async (event) => {
    try {
      const { text } = JSON.parse(event.body);
  
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: text }]
        })
      });
  
      const data = await response.json();
  
      return {
        statusCode: 200,
        body: JSON.stringify({ reply: data.choices?.[0]?.message?.content || "No response." })
      };
    } catch (err) {
      console.error("Error calling OpenAI:", err);
      return {
        statusCode: 500,
        body: JSON.stringify({ reply: "Server error. Please try again." })
      };
    }
  };
  
  