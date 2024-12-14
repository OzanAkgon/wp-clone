import React from "react";
import { Box, Typography, Avatar, IconButton } from "@mui/material";
import {
  MoreVert as MoreVertIcon,
  Search as SearchIcon,
} from "@mui/icons-material";

const ChatHeader = ({ username }) => {
  const displayName = username || user;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 15px",
        backgroundColor: "#075E54",
        color: "white",
        borderBottom: "1px solid #ddd",
      }}
    >
      {/* Kullanıcı Bilgisi */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Avatar
          sx={{
            width: 40,
            height: 40,
            marginRight: "10px",
            backgroundColor: "#34B7F1",
          }}
        >
          {displayName.charAt(0).toUpperCase()}
        </Avatar>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            {displayName}
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontSize: "12px", color: "#d9f0e3" }}
          >
            Çevrimiçi
          </Typography>
        </Box>
      </Box>

      {/* Sağdaki İkonlar */}
      <Box>
        <IconButton sx={{ color: "white" }}>
          <SearchIcon />
        </IconButton>
        <IconButton sx={{ color: "white" }}>
          <MoreVertIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatHeader;
