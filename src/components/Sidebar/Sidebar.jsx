import React, { useState, useEffect } from "react";
import SidebarChat from "./SidebarChat";
import Chat from "../Chat/Chat";
import {
  Box,
  List,
  ListItem,
  Typography,
  Avatar,
  IconButton,
  Modal,
  TextField,
  Button,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import axios from "axios";

const Sidebar = () => {
  const [users, setUsers] = useState([]); // Kullanıcı listesi
  const [activeUser, setActiveUser] = useState(null); // Aktif seçili kullanıcı
  const [currentUser, setCurrentUser] = useState(""); // Mevcut kullanıcı adı
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal açılma durumu
  const [newChatUser, setNewChatUser] = useState(""); // Yeni sohbet için kullanıcı adı
  const [newChatMessage, setNewChatMessage] = useState(""); // Yeni sohbet için mesaj

  useEffect(() => {
    const token = localStorage.getItem("token"); // Tokeni al
    const username = localStorage.getItem("username"); // Kullanıcı adını al
    setCurrentUser(username || "Kullanıcı"); // Eğer localStorage'da yoksa varsayılan "Kullanıcı"

    if (!token) {
      console.error("Token bulunamadı!");
      return;
    }

    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/senders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data); // Gelen kullanıcı listesini state'e kaydediyoruz
      } catch (error) {
        console.error("Veri çekilirken hata oluştu:", error);
      }
    };

    fetchUsers();
  }, []);

  // Modal'ı açma
  const handleOpenModal = () => setIsModalOpen(true);

  // Modal'ı kapama
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewChatUser(""); // Formu sıfırla
    setNewChatMessage(""); // Mesaj alanını sıfırla
  };

  // Yeni sohbet başlatma işlemi
  const handleCreateChat = async () => {
    if (!newChatUser || !newChatMessage) {
      alert("Lütfen hem bir kullanıcı adı hem de bir mesaj girin!");
      return;
    }

    const token = localStorage.getItem("token"); // Tokeni al
    if (!token) {
      console.error("Token bulunamadı!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/send", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          receiverId: newChatUser,
          content: newChatMessage,
        },
      });

      alert("Mesaj başarıyla gönderildi!");
      await fetchUsers();
      handleCloseModal(); // Modal'ı kapat
    } catch (error) {
      console.error("Mesaj gönderilirken hata oluştu:", error);
      alert("Mesaj gönderilemedi!");
    }
  };

  return (
    <Box sx={{ display: "flex", height: "95vh" }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: 300,
          backgroundColor: "#f4f4f4",
          borderRight: "1px solid #ddd",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
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
          {/* Avatar ve selamlama */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar sx={{ marginRight: "10px" }} />
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Merhaba, {currentUser}
            </Typography>
          </Box>

          {/* Sohbet ekle butonu */}
          <IconButton sx={{ color: "#fff" }} onClick={handleOpenModal}>
            <AddCircleOutlineIcon />
          </IconButton>
        </Box>

        {/* Kullanıcı Listesi */}
        <List sx={{ flex: 1, overflowY: "auto" }}>
          {users.map((user, index) => (
            <ListItem
              key={index}
              onClick={() => setActiveUser(user)}
              sx={{
                padding: "10px",
                borderBottom: "1px solid #ddd",
                cursor: "pointer",
                "&:hover": { backgroundColor: "#e1e1e1" },
              }}
            >
              <SidebarChat username={user} />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Chat */}
      <Box sx={{ flex: 1 }}>
        <Chat activeUser={activeUser} />
      </Box>

      {/* Modal - Yeni Sohbet Formu */}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#fff",
            padding: "30px",
            borderRadius: "8px",
            boxShadow: 24,
            width: "400px",
            textAlign: "center",
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: "20px" }}>
            Yeni Sohbet Oluştur
          </Typography>
          <TextField
            label="Kullanıcı Adı"
            fullWidth
            variant="outlined"
            value={newChatUser}
            onChange={(e) => setNewChatUser(e.target.value)}
            sx={{ marginBottom: "20px" }}
          />
          <TextField
            label="Mesaj"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            value={newChatMessage}
            onChange={(e) => setNewChatMessage(e.target.value)}
            sx={{ marginBottom: "20px" }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleCreateChat}
          >
            Gönder
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Sidebar;
