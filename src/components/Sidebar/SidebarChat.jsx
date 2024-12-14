import React from "react";
import { Box, Typography, Avatar, IconButton } from "@mui/material";
import { Chat as ChatIcon } from "@mui/icons-material";

const SidebarChat = ({ username }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        padding: "10px",
        cursor: "pointer",
        borderBottom: "1px solid #ddd",
        "&:hover": {
          backgroundColor: "#f1f1f1", // Hover efekti ekledik
        },
      }}
    >
      {/* Avatar ve kullanıcı ismi */}
      <Avatar sx={{ width: 40, height: 40, marginRight: "15px" }} />
      <Box sx={{ flex: 1 }}>
        <Typography
          variant="body1"
          sx={{ fontWeight: "bold", color: "#075E54" }}
        >
          {username}
        </Typography>
        <Typography variant="body2" sx={{ color: "#888", fontSize: "12px" }}>
          Bu kişiyle konuşmak için tıklayın.
        </Typography>
      </Box>

      {/* Chat icon */}
    </Box>
  );
};

export default SidebarChat;
