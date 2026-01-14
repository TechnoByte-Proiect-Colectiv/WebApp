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
  Card,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ROUTES } from "../../routes/routePaths";
import { userService } from "../../services/userService";
import { ArrowBack } from "@mui/icons-material";
import { User } from "../../types/user/user";

export const UserEditPage: React.FC = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const currentUser = userService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);

      if ((currentUser as any).firstName || (currentUser as any).lastName) {
        setFirstName((currentUser as any).firstName || "");
        setLastName((currentUser as any).lastName || "");
      } else if (currentUser.name) {
        const parts = currentUser.name.split(" ");
        setFirstName(parts[0] || "");
        setLastName(parts.slice(1).join(" ") || "");
      }

      setEmail(currentUser.email);
      setAvatar(currentUser.avatar || null);

      if ((currentUser as any).address) {
        setAddress((currentUser as any).address || "");
      } else if (currentUser.addresses && currentUser.addresses.length > 0) {
        const a = currentUser.addresses[0];
        setAddress(`${a.street}, ${a.city}, ${a.country}`);
      }
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

  const { logout } = useAuth();

  const handleSave = async () => {
    setError(null);

    if (password || confirmPassword) {
      if (!password || !confirmPassword) {
        setError("Complete both password fields to change password.");
        return;
      }

      if (password !== confirmPassword) {
        setError("Parolele nu se potrivesc.");
        return;
      }

      if (password.length < 6) {
        setError("Parola trebuie să aibă cel puțin 6 caractere.");
        return;
      }
    }

    setIsLoading(true);
    try {
      if (password) {
        if (!user?.id) throw new Error("User id missing");
        await userService.changePassword({ id: user.id, password });
      }

      const updatedData: Partial<User> = {
        firstName,
        lastName,
        address: address || undefined,
        email,
        avatar: avatar || undefined,
      };

      if (!updatedData.firstName && !updatedData.lastName && user?.name) {
        updatedData.name = user.name;
      } else {
        updatedData.name = `${(firstName || "").trim()} ${(lastName || "").trim()}`.trim();
      }

      const updatedUser = await userService.updateUser({ ...updatedData, id: user?.id });
      setUser(updatedUser);

      if (password) {
        alert("Contul și parola au fost actualizate cu succes!");
      } else {
        alert("Contul a fost actualizat!");
      }
    } catch (err: any) {
      console.error('updateUser error', err);
      setError(err?.message || (err instanceof Error ? err.message : "Eroare la salvare"));
    } finally {
      setIsLoading(false);

      setPassword("");
      setConfirmPassword("");
    }
  };

  const handleDelete = async () => {
    setError(null);
    if (!user?.id) {
      setError("User id missing");
      return;
    }

    if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      return;
    }

    setIsLoading(true);
    try {
      await userService.deleteUser(user.id);
      navigate(ROUTES.HOME, { replace: true });
      await logout();
    } catch (err: any) {
      console.error('deleteUser error', err);
      setError(err?.message || 'Eroare la stergerea contului');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user && !isLoading) {
    navigate(ROUTES.HOME, { replace: true });
  }

  return (
    <Container
      sx={{
        mt: 4,
        mb: 4,
        borderRadius: 2, 
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

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <TextField
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              fullWidth
              disabled={isLoading}
            />
            <TextField
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              fullWidth
              disabled={isLoading}
            />
          </div>

          <TextField
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
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
            helperText="Leave blank to keep current password"
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

          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            disabled={isLoading}
            sx={{ height: "40px", mt: 1 }}
          >
            Delete Account
          </Button>
        </Box>
      </Card>
    </Container>
  );
};
