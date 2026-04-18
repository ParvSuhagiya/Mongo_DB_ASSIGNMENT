import express from "express"
const app = express()
import NoteRouter from "./routes/note.routes.js";


app.use(express.json());
app.use(NoteRouter);

// 404 — no route matched
app.use((req, res) => {
  res.status(404).json({ msg: 'Route not found.' });
});

export default app;