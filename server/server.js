import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDb } from "./database/db.js";
import { userRoute } from "./routes/user.route.js";
import { itemRoute } from "./routes/item.route.js";
import { orderRoute } from "./routes/order.route.js";

const app = express();
const port = process.env.PORT || 4000;
connectDb();

app.use(
  cors({
  
    origin: ["https://champaran-dhaba.vercel.app", "https://champaran-dhaba-blkb.vercel.app"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRoute);
app.use("/api/item", itemRoute);
app.use("/api/order", orderRoute);

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
