import express from "express";
import * as noteController from "../controllers/note.controller.js";

const NoteRouter = express.Router();

NoteRouter.post("/api/notes", noteController.createNotes);
NoteRouter.post("/api/notes/bulk", noteController.createBulkNotes);
NoteRouter.get("/api/notes", noteController.getAllNotes);
NoteRouter.get("/api/notes/:id", noteController.getNoteById);
NoteRouter.put("/api/notes/:id", noteController.replaceNote);
NoteRouter.patch("/api/notes/:id", noteController.updateNote);
NoteRouter.delete("/api/notes/:id", noteController.deleteNote);
NoteRouter.delete("/api/notes/bulk", noteController.deleteBulkNotes);

export default NoteRouter;