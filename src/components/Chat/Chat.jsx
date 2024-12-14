import React, { useState, useEffect } from "react";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessages";
import { Box, List } from "@mui/material";
import axios from "axios";

const Chat = ({ activeUser }) => {
  const [messages, setMessages] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!activeUser) return;

    const fetchConversation = async () => {
      try {
        const response = await axios.get("http://localhost:8080/conversation", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            receiverId: activeUser,
          },
        });

        // Gelen mesajları zaman sırasına göre düzenle
        setMessages(
          response.data.sort(
            (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
          )
        );
      } catch (error) {
        console.error("Hata:", error.response?.data || error.message);
      }
    };

    fetchConversation();
  }, [activeUser, token]);

  const handleSendMessage = (newMessage) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  if (!activeUser) {
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "164vh",
        height: "95vh",
        backgroundColor: "#e5ddd5",
      }}
    >
      <ChatHeader username={activeUser} />
      <List
        sx={{
          flex: 1,
          overflowY: "auto",
          padding: "10px",
          backgroundColor: "#ffffff",
        }}
      >
        {Array.isArray(messages) && messages.length > 0 ? (
          messages.map((msg, index) => (
            <ChatMessage
              key={index}
              message={msg}
              isSender={msg.senderId !== activeUser}
            />
          ))
        ) : (
          <p style={{ textAlign: "center", color: "#888" }}>
            Henüz bir mesaj yok
          </p>
        )}
      </List>
      <ChatInput activeUser={activeUser} onSendMessage={handleSendMessage} />
    </Box>
  );
};

export default Chat;
