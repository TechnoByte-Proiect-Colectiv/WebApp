import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  IconButton,
  CircularProgress,
  Alert,
  alpha,
  Card,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { userService } from "../../services/userService";
import { ArrowBack } from "@mui/icons-material";
import { User } from "../../types/user/user";
import { darkTheme, lightTheme } from "../../theme/theme";

export const UserEditPage: React.FC = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const currentUser = userService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      setName(currentUser.name);
      setEmail(currentUser.email);
      setAvatar(currentUser.avatar || null);
    }
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    setError(null);

    if (password && password !== confirmPassword) {
      setError("Parolele nu se potrivesc.");
      return;
    }

    setIsLoading(true);
    try {
      const updatedData: Partial<User> = {
        name,
        email,
        avatar: avatar || undefined,
      };

      const updatedUser = await userService.updateUser(updatedData);
      setUser(updatedUser);
      alert("Contul a fost actualizat!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Eroare la salvare");
    } finally {
      setIsLoading(false);
    }
  };

  if (!user && !isLoading) {
    // return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return (
    <Container
      sx={{
        mt: 4,
        mb: 4,
        borderRadius: 2, // colturi rotunjite, optional
        p: 3,
      }}
    >
      <Card sx={{
        p: 4
      }}>
        <Box display="flex" alignItems="center" gap={2} mb={3}>
          <IconButton onClick={() => navigate(-1)} aria-label="go back">
            <ArrowBack />
          </IconButton>
          <Typography variant="h4">Account Settings</Typography>
        </Box>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box display="flex" flexDirection="column" gap={3}>
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar src={avatar || ""} sx={{ width: 80, height: 80 }} />
            <Button variant="outlined" component="label" disabled={isLoading}>
              Upload Image
              <input
                hidden
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>
          </Box>

          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            disabled={isLoading}
          />
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            disabled={isLoading}
          />
          <TextField
            label="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            fullWidth
            disabled={isLoading}
          />

          <Typography variant="h6" mt={2}>
            Change Password
          </Typography>
          <TextField
            label="New Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            disabled={isLoading}
            helperText="Lasă gol dacă nu vrei să schimbi parola"
          />
          <TextField
            label="Confirm New Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            disabled={isLoading}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            disabled={isLoading}
            sx={{ height: "40px" }}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Save Changes"
            )}
          </Button>
        </Box>
      </Card>
    </Container>
  );
};
