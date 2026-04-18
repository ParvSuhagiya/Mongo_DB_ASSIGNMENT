import Note from "../models/note.model.js"
import mongoose from "mongoose";

export async function createNotes(req, res) {
  const { title, content, category, isPinned } = req.body;

  try {
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and Content required fiels",
        data: null
      });
    }

    const note = new Note({
      title,
      content,
      category,
      isPinned
    });

    await note.save();

    return res.status(201).json({
      success: true,
      message: "Note created successfully",
      data: note
    });

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
      data: null
    });
  }
}

export async function createBulkNotes(req, res) {
  const { notes } = req.body;

  try {
    if (!notes || !Array.isArray(notes) || notes.length === 0) {
      return res.status(400).json({
        success: false,
        message: "notes array is required",
        data: null
      });
    }

    const createdNotes = await Note.insertMany(notes);

    return res.status(201).json({
      success: true,
      message: `${createdNotes.length} notes created successfully`,
      data: createdNotes
    });

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
      data: null
    });
  }
}

export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find();

    return res.status(200).json({
      success: true,
      message: "Notes fetched successfully",
      data: notes
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      data: null
    });
  }
}

export async function getNoteById(req, res) {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note id",
        data: null
      });
    }

    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
        data: null
      });
    }

    return res.status(200).json({
      success: true,
      message: "Note fetched successfully",
      data: note
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      data: null
    });
  }
}

export async function replaceNote(req, res) {
  const { id } = req.params;
  const { title, content, category, isPinned } = req.body;

  try {
    if (!title || !content || !category || isPinned === undefined) {
      return res.status(400).json({
        success: false,
        message: "All fields are required for full replacement",
        data: null
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note id",
        data: null
      });
    }

    const note = await Note.findByIdAndUpdate(
      id,
      { title, content, category, isPinned },
      { new: true, overwrite: true, runValidators: true }
    );

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
        data: null
      });
    }

    return res.status(200).json({
      success: true,
      message: "Note replaced successfully",
      data: note
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      data: null
    });
  }
}

export async function updateNote(req, res) {
  const { id } = req.params;
  const updateData = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note id",
        data: null
      });
    }

    if (!updateData || Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No fields provided to update",
        data: null
      });
    }

    const note = await Note.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
        data: null
      });
    }

    return res.status(200).json({
      success: true,
      message: "Note updated successfully",
      data: note
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      data: null
    });
  }
}

export async function deleteNote(req, res) {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note id",
        data: null
      });
    }

    const note = await Note.findByIdAndDelete(id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
        data: null
      });
    }

    return res.status(200).json({
      success: true,
      message: "Note deleted successfully",
      data: null
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      data: null
    });
  }
}