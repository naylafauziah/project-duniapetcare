const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllHewan = async (req, res) => {
  try {
    const hewan = await prisma.hewan.findMany({
      include: {
        users: {
          // Relasi ke users
          select: {
            id_user: true,
            username: true,
            email: true,
          },
        },
      },
    });
    res.status(200).json({ hewan });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching pets", details: error.message });
  }
};

const getHewanById = async (req, res) => {
  try {
    const hewan = await prisma.hewan.findUnique({
      where: { id_hewan: parseInt(req.params.id) },
      include: {
        users: {
          select: {
            id_user: true,
            username: true,
            email: true,
          },
        },
      },
    });

    if (!hewan) return res.status(404).json({ error: "Pet not found" });

    res.status(200).json({ hewan });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching pet", details: error.message });
  }
};

const createHewan = async (req, res) => {
  const { nama_hewan, species, breed, age, weight } = req.body;
  const id_user = req.user.id;

  // console.log("Request Body:", req.body);
  // console.log("User ID from Token:", id_user);

  if (!nama_hewan || !species || !breed || !age || !weight) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newHewan = await prisma.hewan.create({
      data: {
        nama_hewan,
        species,
        breed,
        age: parseInt(age),
        weight: parseFloat(weight),
        id_user,
      },
    });
    res
      .status(201)
      .json({ message: "Pet created successfully", hewan: newHewan });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error creating pet", details: error.message });
  }
};

const updateHewan = async (req, res) => {
  const { id } = req.params;
  const { nama_hewan, species, breed, age, weight } = req.body;

  try {
    const updatedHewan = await prisma.hewan.update({
      where: { id_hewan: parseInt(id) },
      data: {
        nama_hewan : nama_hewan || undefined,
        species : species || undefined,
        breed : breed || undefined,
        age: age ? parseInt(age) : undefined,
        weight: weight ? parseFloat(weight) : undefined,
      },
    });

    res
      .status(200)
      .json({ message: "Pet updated successfully", hewan: updatedHewan });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error updating pet", details: error.message });
  }
};

const deleteHewan = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.hewan.delete({
      where: { id_hewan: parseInt(id) },
    });
    res.status(200).json({ message: "Pet deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error deleting pet", details: error.message });
  }
};

module.exports = {
  getAllHewan,
  getHewanById,
  createHewan,
  updateHewan,
  deleteHewan,
};
