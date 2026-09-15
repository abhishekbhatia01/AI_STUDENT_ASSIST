import imageKit from "../config/imageKit.js";

export const uploadImageToImageKit = async (file) => {
  if (!file?.buffer) {
    throw new Error("File buffer is missing");
  }

  const result = await imageKit.files.upload({
    file: file.buffer.toString("base64"),
    fileName: file.originalname,
    folder: "/study-notes",
  });

  return {
    url: result.url,
    fileId: result.fileId,
  };
};