import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function summarizeCart(cartItems) {
  if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
    throw new Error("Valid cart items array is required");
  }
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    // Prepare a string representation of cart items for the AI
    const itemsSummary = cartItems
      .map(
        (item) =>
          `${item.title} - Quantity: ${item.quantity}, Price: Rs.${item.price}`
      )
      .join("\n");
    const prompt = `Make a humorous summary of the cart. Roast the customer in a light manner. Assume the customer is Nepali. Cart items:\n${itemsSummary}`;
    const result = await model.generateContent(prompt);
    const summary = await result.response.text();
    return summary.trim();
  } catch (error) {
    throw new Error(`Cart summarization failed: ${error.message}`);
  }
}
