import { db } from "../config/db.js";

export const addNoteHandler = async (req, res) => {
  const { title, content } = req.body || {};

  if (!title || !content) {
    return res.status(400).json({ error: "Title dan content wajib diisi" });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO notes (title, content) VALUES (?, ?)",
      [title, content]
    );

    res.status(201).json({
      message: "Note created",
      id: result.insertId,
      title,
      content,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllNotesHandler = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM notes");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getNoteByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query("SELECT * FROM notes WHERE id = ?", [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const updateNoteByIdHandler = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({
      status: "fail",
      message: "Title is required",
    });
  }

  if (!content || !content.trim()) {
    return res.status(400).json({
      status: "fail",
      message: "Content is required",
    });
  }

  await db.query("UPDATE notes SET title = ?, content = ? WHERE id = ?", [
    title,
    content,
    id,
  ]);

  const [notes] = await db.query("SELECT * FROM notes WHERE id = ?", [id]);

  if (notes.length === 0) {
    return res.status(404).json({
      status: "fail",
      message: "Cannot find note",
    });
  }

  res.status(200).json({
    status: "success",
    message: "Note updated",
    data: notes[0],
  });
};


export const deleteNoteByIdHandler = async (req, res) => {
  const { id } = req.params;

  const [deleteNote] = await db.query("DELETE FROM notes WHERE id = ?", [id]);

  if (deleteNote.affectedRows === 0) {
    return res.status(404).json({
      status: "fail",
      message: "Cannot find note",
    });
  }

  res.status(200).json({
    status: "success",
    message: "Note deleted",
  });
};