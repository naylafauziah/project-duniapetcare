const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all services
const getAllLayanan = async (req, res) => {
    try {
      const layanan = await prisma.layanan.findMany();
      res.status(200).json({ layanan });
    } catch (error) {
      res.status(500).json({ error: "Error fetching services", details: error.message });
    }
  };
  
  // Get service by ID
  const getLayananById = async (req, res) => {
    try {
      const layanan = await prisma.layanan.findUnique({
        where: { id_layanan: parseInt(req.params.id) },
      });
  
      if (!layanan) return res.status(404).json({ error: "Service not found" });
  
      res.status(200).json({ layanan });
    } catch (error) {
      res.status(500).json({ error: "Error fetching service", details: error.message });
    }
  };
  
  // Create a new service
  const createLayanan = async (req, res) => {
    const { nama_layanan, description, harga, tipe_layanan, img_url } = req.body;
  
    try {
      const newLayanan = await prisma.layanan.create({
        data: {
          nama_layanan,
          description,
          harga: parseFloat(harga),
          tipe_layanan,
          img_url
        },
      });
      res.status(201).json({ message: "Service created successfully", layanan: newLayanan });
    } catch (error) {
      res.status(500).json({ error: "Error creating service", details: error.message });
    }
  };
  
  // Update service
  const updateLayanan = async (req, res) => {
    const { id } = req.params;
    const { nama_layanan, description, harga, tipe_layanan, img_url } = req.body;
  
    try {
      const updatedLayanan = await prisma.layanan.update({
        where: { id_layanan: parseInt(id) },
        data: {
          nama_layanan,
          description,
          harga: harga ? parseFloat(harga) : undefined,
          tipe_layanan,
          img_url
        },
      });
  
      res.status(200).json({ message: "Service updated successfully", layanan: updatedLayanan });
    } catch (error) {
      res.status(500).json({ error: "Error updating service", details: error.message });
    }
  };
  
  // Delete service
  const deleteLayanan = async (req, res) => {
    const { id } = req.params;
  
    try {
      await prisma.layanan.delete({
        where: { id_layanan: parseInt(id) },
      });
      res.status(200).json({ message: "Service deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting service", details: error.message });
    }
  };
  
  module.exports = { getAllLayanan, getLayananById, createLayanan, updateLayanan, deleteLayanan };
  