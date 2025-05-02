const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { io } = require('../server');

// Fungsi untuk mengirim pesan
const sendMessage = async (req, res) => {
    const senderId = req.userId;  // Dapatkan senderId dari request
    const { receiverId, message } = req.body;
  
    try {
      if (!senderId || !receiverId || !message) {
        return res.status(400).json({ error: 'Sender ID, Receiver ID, and Message are required' });
      }
  
      const newMessage = await prisma.chat.create({
        data: {
          senderId: senderId,  // Gunakan userId yang sudah didecode
          receiverId: parseInt(receiverId),
          message: message,
          created_at: new Date(),
          updated_at: new Date(),
        },
      });

      // Emit the new message to the receiver
      io.emit('newMessage', newMessage);
  
      return res.status(200).json({ message: 'Message sent successfully', data: newMessage });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to send message' });
    }
  };

// Fungsi untuk mendapatkan semua pesan antara pengguna
const getMessages = async (req, res) => {
    const senderId = req.userId;  // Ambil senderId dari token
    const { receiverId } = req.query;
  
    try {
      // Validasi input
      if (!receiverId) {
        return res.status(400).json({ error: 'Receiver ID is required' });
      }
  
      // Ambil semua pesan antara sender dan receiver
      const messages = await prisma.chat.findMany({
        where: {
          OR: [
            { senderId: senderId, receiverId: parseInt(receiverId) },
            { senderId: parseInt(receiverId), receiverId: senderId }
          ]
        },
        orderBy: {
          created_at: 'asc', // Urutkan berdasarkan waktu pengiriman pesan
        },
      });
  
      return res.status(200).json({ messages });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to fetch messages' });
    }
  };

module.exports = { sendMessage, getMessages };