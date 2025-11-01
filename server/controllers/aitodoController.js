import { OpenAI } from "openai";
import dotenv, { parse } from "dotenv";
dotenv.config();

const perplexity = new OpenAI({
    apiKey: process.env.PERPLEXITY_API_KEY,
    baseURL: "https://api.perplexity.ai",
})

const today = new Date().toLocaleDateString('en-GB');

export const createAITodo = async (req, res) => {
    try {
        const { input } = req.body
        console.log(input)
        if (!input) {
            return res.status(400).json({ error: "Input is required" })
        }

        const response = await perplexity.chat.completions.create({
            model: "sonar-pro",
            messages: [
                {
                    role: "system",
                    content: `You are a todo parser. 
                        Today's date is ${today}.
                        Extract 'title' and 'dueDate' from the user input. 
                        If user mentions relative dates like "tomorrow", "next Monday", or "coming Friday", 
                        calculate the exact date based on today's date and return it in yyyy-mm-dd format. 
                        If no date is mentioned, set "dueDate" as an empty string.
                        Return only a valid JSON object with keys 'title' and 'dueDate'.`
                },
                {
                    role: "user",
                    content: input
                }
            ],
            max_completion_tokens: 100,
            stream: false
        })

        let parsed;

        try {
            parsed = JSON.parse(response.choices[0].message?.content);
        } catch (err) {
            console.error("Perplexity invalid JSON:", response.choices[0].message?.content);
            return res.status(500).json({ error: "Invalid response from Perplexity" });
        }

        console.log(parsed)

        res.json(parsed);
    } catch (error) {
        console.log(error)
    }
}