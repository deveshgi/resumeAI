import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.error("ERROR in Express App: ", error);
      throw error;
    });
    app.listen(PORT, () => {
      console.log(`Server is running at port : http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Mango DB localHost connection failed !!! ", err);
  });