const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllDokter = async (req, res) => {
  try {
    const dokter = await prisma.dokter.findMany({
      include: {
        users: {
          select: {
            id_user: true,
            username: true,
            email: true,
            full_name: true,
          },
        },
      },
    });
    res.status(200).json({ dokter });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching doctors", details: error.message });
  }
};

const getDokterById = async (req, res) => {
  const { id } = req.params;

  try {
    const dokter = await prisma.dokter.findUnique({
      where: { id_dokter: parseInt(id) },
      include: {
        users: {
          select: {
            id_user: true,
            username: true,
            email: true,
            full_name: true,
          },
        },
      },
    });

    if (!dokter) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    res.status(200).json({ dokter });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching doctor", details: error.message });
  }
};

const createDokter = async (req, res) => {
  const { id_user, spesialisasi, experience_years, rating } = req.body;
  const role = req.user.role;

  if (role !== "admin") {
    return res.status(403).json({ error: "Only admins can delete doctors" });
  }

  if (!id_user || !spesialisasi || !experience_years) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newDokter = await prisma.dokter.create({
      data: {
        id_user,
        spesialisasi,
        experience_years: parseInt(experience_years),
        rating: rating ? parseFloat(rating) : 0.0,
      },
    });

    res
      .status(201)
      .json({ message: "Doctor created successfully", dokter: newDokter });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error creating doctor", details: error.message });
  }
};

const updateDokter = async (req, res) => {
  const { id } = req.params;
  const { spesialisasi, experience_years, rating } = req.body;
  const role = req.user.role;

  if (role !== "admin") {
    return res.status(403).json({ error: "Only admins can delete doctors" });
  }

  try {
    const updatedDokter = await prisma.dokter.update({
      where: { id_dokter: parseInt(id) },
      data: {
        spesialisasi: spesialisasi || undefined,
        experience_years: experience_years
          ? parseInt(experience_years)
          : undefined,
        rating: rating ? parseFloat(rating) : undefined,
      },
    });

    res
      .status(200)
      .json({ message: "Doctor updated successfully", dokter: updatedDokter });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error updating doctor", details: error.message });
  }
};

const deleteDokter = async (req, res) => {
  const { id } = req.params;
  const role = req.user.role;

  if (role !== "admin") {
    return res.status(403).json({ error: "Only admins can delete doctors" });
  }

  try {
    await prisma.dokter.delete({
      where: { id_dokter: parseInt(id) },
    });

    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error deleting doctor", details: error.message });
  }
};

module.exports = {
  getAllDokter,
  getDokterById,
  createDokter,
  updateDokter,
  deleteDokter,
};
