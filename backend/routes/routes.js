const express = require("express");
const {
  login,
  register,
  me,
  deleteUser,
  getAllUser,
  getuserById,
  updateUser,
} = require("../controllers/user-controller");
const {
  getAllArtikel,
  getArtikelById,
  createArtikel,
  updateArtikel,
  deleteArtikel,
} = require("../controllers/artikel-controller");
const {
  createHewan,
  deleteHewan,
  getAllHewan,
  getHewanById,
  updateHewan,
} = require("../controllers/hewan-controller");
const {
  createComment,
  deleteComment,
  updateComment,
} = require("../controllers/comment-controller");
const {
  createDokter,
  deleteDokter,
  getAllDokter,
  getDokterById,
  updateDokter,
} = require("../controllers/dokter-controller");
const {
  createBooking,
  deleteBooking,
  getAllBooking,
  getBookingById,
  updateBooking,
  updateStatusBooking,
} = require("../controllers/booking-controller");
const {
  createLayanan,
  deleteLayanan,
  getAllLayanan,
  getLayananById,
  updateLayanan,
} = require("../controllers/layanan-controller");
const { getPendapatan } = require("../controllers/pendapatan-controller");
const { sendMessage, getMessages } = require("../controllers/chat-controller");

const { verifyToken } = require("../middleware/auth-middleware");
const router = express.Router();

// auth route
router.post("/auth/register", register);
router.post("/auth/login", login);
router.get("/auth/me", verifyToken, me);

// user route
router.get("/user", verifyToken, getAllUser);
router.get("/user/:id", verifyToken, getuserById);
router.patch("/user/:id", verifyToken, updateUser);
router.delete("/user/:id", verifyToken, deleteUser);

// artikel route
router.get("/artikel", verifyToken, getAllArtikel);
router.get("/artikel/:id", verifyToken, getArtikelById);
router.post("/artikel", verifyToken, createArtikel);
router.patch("/artikel/:id", verifyToken, updateArtikel);
router.delete("/artikel/:id", verifyToken, deleteArtikel);

// comment route
router.post("/artikel/:id/comment", verifyToken, createComment);
router.patch("/artikel/:id/comment/:comment_id", verifyToken, updateComment);
router.delete("/artikel/:id/comment/:comment_id", verifyToken, deleteComment);

// hewan route
router.get("/hewan", verifyToken, getAllHewan);
router.get("/hewan/:id", verifyToken, getHewanById);
router.post("/hewan", verifyToken, createHewan);
router.patch("/hewan/:id", verifyToken, updateHewan);
router.delete("/hewan/:id", verifyToken, deleteHewan);

// booking route
router.get("/booking", verifyToken, getAllBooking);
router.get("/booking/:id", verifyToken, getBookingById);
router.post("/booking", verifyToken, createBooking);
router.post("/booking/status/:id", verifyToken, updateStatusBooking);
router.patch("/booking/:id", verifyToken, updateBooking);
router.delete("/booking/:id", verifyToken, deleteBooking);

// layanan route
router.get("/layanan", verifyToken, getAllLayanan);
router.get("/layanan/:id", verifyToken, getLayananById);
router.post("/layanan", verifyToken, createLayanan);
router.patch("/layanan/:id", verifyToken, updateLayanan);
router.delete("/layanan/:id", verifyToken, deleteLayanan);

// dokter route
router.get("/dokter", verifyToken, getAllDokter);
router.get("/dokter/:id", verifyToken, getDokterById);
router.post("/dokter", verifyToken, createDokter);
router.patch("/dokter/:id", verifyToken, updateDokter);
router.delete("/dokter/:id", verifyToken, deleteDokter);

// revenue route
router.get("/pendapatan", verifyToken, getPendapatan);

// chat route
router.post("/chat/send", verifyToken, sendMessage);
router.get("/chat/messages", verifyToken, getMessages);

module.exports = router;
