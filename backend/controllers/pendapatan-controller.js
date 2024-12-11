const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getPendapatan = async (req, res) => {
  try {
    const totalRevenue = await prisma.booking.aggregate({
      _sum: {
        total_price: true,
      },
      where: {
        status: 'completed',
      },
    });

    res.status(200).json({
      total_revenue: totalRevenue._sum.total_price || 0,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error fetching total revenue",
      details: error.message,
    });
  }
};

module.exports = { getPendapatan };