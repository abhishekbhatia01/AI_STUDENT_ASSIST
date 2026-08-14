import { connectDB } from "./src/config/db.js";
import app from "./app.js";
import { PORT } from "./src/config/config.js";

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
