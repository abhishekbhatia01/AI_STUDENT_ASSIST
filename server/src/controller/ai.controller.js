import { generateAiResponse } from "../services/ai.service.js";

export const generateResponse = async (req, res) => {
    const { prompt } = req.body;

    if(!prompt){
        throw new Error("Prompt is required");
    }

    const response = await generateAiResponse(prompt);


    res.status(200).json({
        success: true,
        data: response,
    });
}