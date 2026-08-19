import { analyzeImage } from "../services/text-file.service.js";
import asyncHandler from "../utils/asyncHandler.js";

export const analyzeImageController = asyncHandler (async (req, res) => {
  const file = req.file;

  const result = await analyzeImage(file);

  res.json({
    message: "Image analyzed successfully",
    data: result,
  }); 
});
