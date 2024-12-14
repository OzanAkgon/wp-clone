import React, { useState } from "react";
import { Box, TextField, IconButton } from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";
import axios from "axios";

const ChatInput = ({ activeUser, onSendMessage }) => {
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  const sendMessage = async () => {
    if (!message.trim() || !activeUser) return; // Mesaj boşsa gönderme

    try {
      const response = await axios.post("http://localhost:8080/send", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          receiverId: activeUser,
          content: message,
        },
      });

      // Ana bileşene yeni mesajı gönder
      onSendMessage(response.data);
      setMessage(""); // Mesaj inputunu temizle
    } catch (error) {
      console.error("Mesaj gönderilirken hata oluştu:", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        padding: "10px",
        borderTop: "1px solid #ddd",
        backgroundColor: "white",
      }}
    >
      <TextField
        fullWidth
        placeholder="Mesajınızı yazın..."
        variant="outlined"
        size="small"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <IconButton color="primary" onClick={sendMessage}>
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default ChatInput;
