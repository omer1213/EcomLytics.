
//import { groq } from "@ai-sdk/groq";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    // Check if GROQ_API_KEY is set
    if (!process.env.GROQ_API_KEY) {
      console.error("GROQ_API_KEY is not set");
      // Fall back to a hardcoded response if no API key
      return NextResponse.json({
        text: "I'm sorry, I can't connect to the AI service right now. Please check your API key configuration."
      });
    }

    // Parse the request body
    const body = await req.json();
    console.log("Request body:", body);

    // Extract prompt and chatId
    const prompt = body.prompt || (body.messages && body.messages[0]?.content) || "Hello";
    const chatId = body.chatId;

    // Format messages for Groq
    const messages = [
      {
        role: "system",
        content: `
You are an AI assistant specialized in content creation for e-commerce.
Behave like a professional marketer, expert copywriter, and SEO specialist combined.
Your responses should be persuasive, emotionally engaging, and optimized for search engines.
Focus on helping users create compelling product descriptions, promotional content, and blog ideas that drive conversions and boost online presence.

System Instruction:
You're the user's go-to expert for e-commerce content creation. Use persuasive copywriting, SEO strategies, and emotional storytelling to boost online success.
        `.trim()
      },
      {
        role: "user",
        content: prompt
      }
    ];

    // Use Groq to generate a response
    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: messages,
          temperature: 0.7,
          max_tokens: 1000
        })
      });

      if (!response.ok) {
        throw new Error(`Groq API error: ${response.status}`);
      }

      const data = await response.json();
      const text = data.choices[0]?.message?.content || "No response generated";

      // Save to database if chatId is provided
      if (chatId) {
        try {
          await supabase.from("messages").insert([
            {
              chat_id: chatId,
              role: "AI Writer",
              content: text,
            },
          ]);

          await supabase
            .from("chats")
            .update({
              updated_at: new Date().toISOString(),
            })
            .eq("id", chatId);
        } catch (dbError) {
          console.error("Database error:", dbError);
        }
      }

      // Return the response as JSON
      return NextResponse.json({ text });
    } catch (groqError) {
      console.error("Groq API error:", groqError);

      // Return a fallback response
      const fallbackResponse = `I'm sorry, I encountered an error while generating a response to "${prompt}". Please try again with a different question.`;

      // Save error message to database if chatId is provided
      if (chatId) {
        try {
          await supabase.from("messages").insert([
            {
              chat_id: chatId,
              role: "AI Writer",
              content: fallbackResponse,
            },
          ]);
        } catch (dbError) {
          console.error("Database error:", dbError);
        }
      }

      return NextResponse.json({ text: fallbackResponse });
    }
  } catch (error) {
    console.error("General error:", error);
    return NextResponse.json(
      { text: "Sorry, I encountered an error while processing your request." },
      { status: 500 }
    );
  }
}