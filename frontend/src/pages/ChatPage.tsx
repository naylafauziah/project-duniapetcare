import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import io, { Socket } from 'socket.io-client';
import './ChatPage.css';

// Menghubungkan ke socket server
const socket: Socket = io('http://localhost:5173'); // Pastikan sesuai dengan URL server Anda

// Definisikan tipe data untuk chat
interface Chat {
  id: number;
  sender: string;
  receiver: string;
  message: string;
  timestamp: string;
}

const ChatPage: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [message, setMessage] = useState<string>('');
  const [sender] = useState<string>('Customer');  // Pengirim default sebagai 'Customer'
  const [receiver] = useState<string>('Admin');  // Penerima default sebagai 'Admin'

  const messageEndRef = useRef<HTMLDivElement>(null);

  // Ambil chat history saat komponen pertama kali dimuat
  useEffect(() => {
    axios.get('http://localhost:5000/api/chats')
      .then(response => {
        setChats(response.data);
      })
      .catch(error => {
        console.error('Error fetching chats:', error);
      });

    // Menerima pesan baru melalui socket
    socket.on('newMessage', (newChat: Chat) => {
      setChats((prevChats) => [newChat, ...prevChats]);
    });

    // Bersihkan listener ketika komponen di-unmount
    return () => {
      socket.off('newMessage');
    };
  }, []);

  // Fungsi untuk mengirim pesan
  const sendMessage = () => {
    if (!message.trim()) return;

    const newChat: Chat = { id: Date.now(), message, sender, receiver, timestamp: new Date().toISOString() };

    // Kirim pesan ke server dan kirim ke socket
    axios.post('http://localhost:5000/api/chats', newChat)
      .then((response) => {
        const chat = response.data;
        setChats([chat, ...chats]);  // Tambahkan pesan terbaru ke daftar
        setMessage('');
        socket.emit('newMessage', chat);  // Emit pesan ke semua klien yang terkoneksi
      })
      .catch((error) => {
        console.error('Error sending message:', error);
      });
  };

  // Scroll ke bawah setelah ada pesan baru
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chats]);

  return (
    <div className="chat-page">
      <h1>Live Chat - PetCare</h1>
      <div className="chat-container">
        <div className="chat-box">
          {chats.map((chat) => (
            <div key={chat.id} className="chat-message">
              <strong>{chat.sender}</strong> to <strong>{chat.receiver}</strong>:
              <p>{chat.message}</p>
              <span>{new Date(chat.timestamp).toLocaleString()}</span>
            </div>
          ))}
          <div ref={messageEndRef} />
        </div>

        <div className="message-input">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
