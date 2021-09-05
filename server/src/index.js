import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

app.use(express.json({ limit: "20mb", extended: true }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server started on http://localhost:${PORT}`)
    )
  )
  .catch((err) => console.log(err.message));
