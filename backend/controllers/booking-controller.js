const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all bookings
const getAllBooking = async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        users: {
          select: {
            id_user: true,
            username: true,
            email: true,
            full_name: true,
            phone_number: true,
          },
        },
        hewan: true,
        layanan: true,
        dokter: true,
      },
    });

    if (bookings.length === 0) {
      return res.status(404).json({ error: "No bookings found" });
    }

    res.status(200).json({ bookings });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error fetching bookings",
      details: error.message,
    });
  }
};

// Get booking by ID
const getBookingById = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await prisma.booking.findUnique({
      where: { id_booking: parseInt(id) },
      include: {
        users: {
          select: {
            id_user: true,
            username: true,
            email: true,
            full_name: true,
            phone_number: true,
          },
        },
        hewan: true,
        layanan: true,
        dokter: true,
      },
    });

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.status(200).json({ booking });
  } catch (error) {
    res.status(500).json({
      error: "Error fetching booking",
      details: error.message,
    });
  }
};

// Create a new booking
const createBooking = async (req, res) => {
  const id_user = req.user.id;

  const {
    id_hewan,
    id_layanan,
    id_dokter,
    appointment_date,
    status,
    total_price,
    notes,
  } = req.body;

  if (!id_hewan || !id_layanan || !id_dokter || !appointment_date) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newBooking = await prisma.booking.create({
      data: {
        id_user,
        id_hewan,
        id_layanan,
        id_dokter,
        total_price,
        notes,
        appointment_date: new Date(appointment_date), // Convert to Date
        status: status ?? "pending",
      },
    });

    res.status(201).json({
      message: "Booking created successfully",
      booking: newBooking,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error creating booking",
      details: error.message,
    });
  }
};

// Update a booking
const updateBooking = async (req, res) => {
  const { id } = req.params;
  const {
    id_hewan,
    id_layanan,
    id_dokter,
    appointment_date,
    status,
    total_price,
    notes,
  } = req.body;

  if (!id_hewan || !id_layanan || !id_dokter || !appointment_date) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const updatedBooking = await prisma.booking.update({
      where: { id_booking: parseInt(id) },
      data: {
        id_hewan,
        id_layanan,
        id_dokter,
        appointment_date: new Date(appointment_date), // Convert to Date
        status,
        total_price,
        notes,
      },
    });

    res.status(200).json({
      message: "Booking updated successfully",
      booking: updatedBooking,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error updating booking",
      details: error.message,
    });
  }
};

// Delete a booking
const deleteBooking = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.booking.delete({
      where: { id_booking: parseInt(id) },
    });

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error deleting booking", details: error.message });
  }
};

module.exports = {
  getAllBooking,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
};
