const express = require("express");
import { config } from "dotenv";
import { dbConnect } from "./db/dbConnect";
import { userRouter } from "./routes/userRoute";

config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());

dbConnect();

//users
app.use("/users", userRouter);

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
