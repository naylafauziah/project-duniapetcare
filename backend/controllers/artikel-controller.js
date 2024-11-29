const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllArtikel = async (req, res) => {
  try {
    const artikel = await prisma.artikel.findMany({
      include: {
        penulis: {
          select: {
            id_user: true,
            username: true,
            email: true,
            full_name: true,
          },
        },
        comment: true,
      },
    });
    res.status(200).json({ artikel });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Something went wrong, please try again later." });
  }
};

const getArtikelById = async (req, res) => {
  try {
    const artikel = await prisma.artikel.findUnique({
      where: { id_artikel: parseInt(req.params.id) },
      include: {
        penulis: {
          select: {
            id_user: true,
            username: true,
            email: true,
            full_name: true,
          },
        },
        comment: true,
      },
    });

    if (!artikel) {
      return res.status(404).json({ error: "Artikel not found." });
    }

    res.status(200).json({ artikel });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong, please try again later." });
  }
};

const createArtikel = async (req, res) => {
  const { judul, content } = req.body;
  const id_penulis = req.user.id

  if (!judul || !content) {
    return res.status(400).json({ error: "Judul and content are required." });
  }

  try {
    const newArtikel = await prisma.artikel.create({
      data: {
        judul,
        content,
        id_penulis: id_penulis || null,
      },
    });

    res
      .status(201)
      .json({ message: "sukses menambahkan artikel", artikel: newArtikel });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong, please try again later." });
  }
};

const updateArtikel = async (req, res) => {
  const { id } = req.params;
  const { judul, content } = req.body;

  try {
    const updatedArtikel = await prisma.artikel.update({
      where: { id_artikel: parseInt(id) },
      data: {
        judul: judul || undefined,
        content: content || undefined,
      },
    });

    if (!updatedArtikel) {
      return res.status(404).json({ error: "Artikel not found." });
    }

    res.status(200).json({ updatedArtikel });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong, please try again later." });
  }
};

const deleteArtikel = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedArtikel = await prisma.artikel.delete({
      where: { id_artikel: parseInt(id) },
    });

    if (!deletedArtikel) {
      return res.status(404).json({ error: "Artikel not found." });
    }

    res.status(200).json({ message: "Artikel deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong, please try again later." });
  }
};

module.exports = {
  getAllArtikel,
  getArtikelById,
  createArtikel,
  updateArtikel,
  deleteArtikel,
};
