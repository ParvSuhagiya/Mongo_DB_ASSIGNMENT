import Note from "../models/note.model.js"

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