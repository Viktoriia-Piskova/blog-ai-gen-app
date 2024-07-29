import { HfInference } from "@huggingface/inference";
const apiKey = process.env.HF_TOKEN;
const hf = new HfInference(apiKey);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const prompt = "Write a short text about home puppy for a 4 year old child";

    try {
      const result = await hf.textGeneration({
        model: "gpt2", // You can use any other available model
        inputs: prompt,
        parameters: { max_new_tokens: 250 },
      });

      console.log(result);

      res.status(200).json({ text: result.generated_text });
      
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error generating text" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
  //res.status(200).json({ name: "generate post" });
}
