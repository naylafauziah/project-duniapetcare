const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createComment = async (req, res) => {
  const { id: artikelId } = req.params;
  const { content } = req.body;
  const userId = req.user.id;

  try {
    const artikel = await prisma.artikel.findUnique({
      where: { id_artikel: parseInt(artikelId) },
    });

    if (!artikel) {
      return res.status(404).json({ error: "Artikel not found." });
    }

    const comment = await prisma.comment.create({
      data: {
        id_artikel: parseInt(artikelId),
        id_user: userId,
        content,
      },
    });

    res.status(201).json({ message: "Comment created successfully.", comment });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong, please try again later." });
  }
};

const updateComment = async (req, res) => {
  const { id: artikelId, comment_id: commentId } = req.params;
  const { content } = req.body;
  const userId = req.user.id;

  try {
    const comment = await prisma.comment.findUnique({
      where: { id_comment: parseInt(commentId) },
    });

    if (!comment || comment.id_artikel !== parseInt(artikelId)) {
      return res.status(404).json({ error: "Comment not found." });
    }

    if (comment.id_user !== userId) {
      return res.status(403).json({
        error: "Access denied. You can only update your own comments.",
      });
    }

    const updatedComment = await prisma.comment.update({
      where: { id_comment: parseInt(commentId) },
      data: { content },
    });

    res
      .status(200)
      .json({ message: "Comment updated successfully.", updatedComment });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong, please try again later." });
  }
};

const deleteComment = async (req, res) => {
  const { id: artikelId, comment_id: commentId } = req.params;
  const userId = req.user.id;

  try {
    const comment = await prisma.comment.findUnique({
      where: { id_comment: parseInt(commentId) },
    });

    if (!comment || comment.id_artikel !== parseInt(artikelId)) {
      return res.status(404).json({ error: "Comment not found." });
    }

    if (comment.id_user !== userId) {
      return res
        .status(403)
        .json({
          error: "Access denied. You can only delete your own comments.",
        });
    }

    await prisma.comment.delete({
      where: { id_comment: parseInt(commentId) },
    });

    res.status(200).json({ message: "Comment deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong, please try again later." });
  }
};
module.exports = { createComment, updateComment, deleteComment };
