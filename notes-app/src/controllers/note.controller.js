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