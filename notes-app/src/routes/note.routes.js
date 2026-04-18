import express from "express";
import * as noteController from "../controllers/note.controller.js";

const NoteRouter = express.Router();

NoteRouter.post("/api/notes", noteController.createNotes);
NoteRouter.post("/api/notes/bulk", noteController.createBulkNotes);

export default NoteRouter;