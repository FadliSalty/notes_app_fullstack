import express from "express";
import {
  addNoteHandler,
  deleteNoteByIdHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  updateNoteByIdHandler,
} from "../handlers/notesHandler.js";

const notesRoute = express.Router();

notesRoute.post("/notes", addNoteHandler);
notesRoute.get("/notes", getAllNotesHandler);
notesRoute.get("/notes/:id", getNoteByIdHandler);
notesRoute.delete("/notes/:id",deleteNoteByIdHandler )
notesRoute.put("/notes/:id", updateNoteByIdHandler)

export default notesRoute;
