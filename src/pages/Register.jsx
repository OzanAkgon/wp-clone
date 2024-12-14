import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Box, Button, Grid, TextField, Typography, Alert } from "@mui/material";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/register", {
        username,
        password,
      });
      setMessage("Başarıyla üye oldunuz, yönlendiriliyorsunuz...");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      setError("Üyelik başarısız. Lütfen bilgilerinizi kontrol edin.");
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      <Grid item xs={12} sm={8} md={4}>
        <Box
          sx={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "24px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            backgroundColor: "white",
          }}
        >
          <Typography variant="h5" align="center" gutterBottom>
            Üye Ol
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <form onSubmit={handleRegister}>
            <TextField
              fullWidth
              label="Kullanıcı Adı"
              variant="outlined"
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Şifre"
              type="password"
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                backgroundColor: "#25D366",
                "&:hover": { backgroundColor: "#1cba57" },
              }}
            >
              ÜYE OL
            </Button>
          </form>
          {message && (
            <Typography variant="body1" sx={{ mt: 2 }}>
              {message}
            </Typography>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}

export default Register;
