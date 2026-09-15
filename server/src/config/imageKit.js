import ImageKit from "@imagekit/nodejs";
import { IMAGEKIT_PRIVATE_KEY } from "./config.js";

const imagekit = new ImageKit({
  privateKey: IMAGEKIT_PRIVATE_KEY,
});

export default imagekit;
