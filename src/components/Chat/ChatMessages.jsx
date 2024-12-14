import React from "react";
import { Box, Typography } from "@mui/material";

const ChatMessage = ({ message, isSender }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isSender ? "flex-end" : "flex-start",
        margin: "10px 0",
      }}
    >
      <Box
        sx={{
          maxWidth: "60%",
          backgroundColor: isSender ? "#DCF8C6" : "#FFFFFF",
          padding: "10px",
          borderRadius: "15px",
          borderTopLeftRadius: isSender ? "15px" : "0",
          borderTopRightRadius: isSender ? "0" : "15px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        }}
      >
        <Typography sx={{ color: "#333", fontSize: "14px" }}>
          {message.content}
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatMessage;
