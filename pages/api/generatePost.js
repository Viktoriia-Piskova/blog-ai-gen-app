import { HfInference } from "@huggingface/inference";
const apiKey = process.env.HF_TOKEN;
const hf = new HfInference(apiKey);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { topic, keywords } = req.body;

    const prompt = `Write a short text about ${topic} with the following comma separated ${keywords}`;
    const titlePromt = `Write a SEO title about ${topic} with the following ${keywords}`;
    const descriptionPrompt = `Write a SEO description about ${topic} with the following ${keywords}`;

    let postContent = "";
    let title = "";
    let metaDescription = "";

    try {
      const postResult = await hf.textGeneration({
        model: "gpt2",
        inputs: prompt,
        parameters: { max_new_tokens: 250 },
      });
      const titleResult = await hf.textGeneration({
        model: "gpt2",
        inputs: titlePromt,
        parameters: { max_new_tokens: 20 },
      });
      const descriptionResult = await hf.textGeneration({
        model: "gpt2",
        inputs: descriptionPrompt,
        parameters: { max_new_tokens: 50 },
      });

      postContent = postResult.generated_text;
      title = titleResult.generated_text;
      metaDescription = descriptionResult.generated_text;
      res.status(200).json({ post: { postContent, title, metaDescription } });
    } catch (error) {
      res.status(500).json({ error: "Error generating text" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
