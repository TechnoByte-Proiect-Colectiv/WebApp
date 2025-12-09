import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  CircularProgress,
  IconButton,
  Alert,
  FormControlLabel,
  Switch,
  Chip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";

const API_BASE_URL = "http://localhost:8080/api/user";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Stare pentru Dialog
  const [open, setOpen] = useState(false);

  // Stare sincronizata cu structura SQL
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    isAdmin: false, // Mapam pe boolean-ul din SQL
  });

  // 1. READ (GET)
  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/users`);
      setUsers(response.data);
      setError(null);
    } catch (err) {
      console.error("Eroare la fetch users:", err);
      setError("Nu s-au putut încărca utilizatorii. Verifică Backend-ul.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  //2. CREATE (POST)
  const handleCreateUser = async () => {
    // Validare simpla
    if (!newUser.email || !newUser.password || !newUser.firstName) {
      alert("Te rog completează câmpurile obligatorii!");
      return;
    }

    try {
      // Backend-ul asteapta un obiect User.
      // authToken si dateCreated ar trebui gestionate de Backend la inserare.
      const payload = {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        password: newUser.password,
        address: newUser.address,
        isAdmin: newUser.isAdmin,
        // authToken: 0, // Daca backend-ul cere neaparat un int, decomenteaza
        dateCreated: new Date(),
      };

      await axios.post(`${API_BASE_URL}/create`, payload);

      setOpen(false);
      // Resetam formularul
      setNewUser({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        address: "",
        isAdmin: false,
      });
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Eroare la crearea utilizatorului!");
    }
  };

  // 3. DELETE
  const handleDeleteUser = async (user) => {
    if (
      !window.confirm(
        `Ești sigur că vrei să ștergi utilizatorul ${user.email}?`
      )
    )
      return;

    try {
      // Daca tabela SQL nu are coloana 'id', backend-ul probabil sterge dupa email
      // Verificam daca user-ul are id, altfel trimitem email-ul
      const identifier = user.id || user.email;

      await axios.delete(`${API_BASE_URL}/${identifier}`);

      setUsers(users.filter((u) => (u.id || u.email) !== identifier));
    } catch (err) {
      console.error(err);
      alert("Eroare la ștergere. Verifică consola.");
    }
  };

  // HANDLERS
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSwitchChange = (e) => {
    setNewUser({ ...newUser, isAdmin: e.target.checked });
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{ fontWeight: "bold", color: "#1976d2" }}
        >
          Utilizatori
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
          sx={{ borderRadius: 2 }}
        >
          Utilizator Nou
        </Button>
      </div>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {isLoading ? (
        <div
          style={{ display: "flex", justifyContent: "center", padding: "40px" }}
        >
          <CircularProgress />
        </div>
      ) : (
        <TableContainer
          component={Paper}
          elevation={2}
          sx={{ borderRadius: 2 }}
        >
          <Table sx={{ minWidth: 650 }}>
            <TableHead sx={{ backgroundColor: "#f8f9fa" }}>
              <TableRow>
                <TableCell>
                  <strong>Nume Complet</strong>
                </TableCell>
                <TableCell>
                  <strong>Email</strong>
                </TableCell>
                <TableCell>
                  <strong>Adresă</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Tip Cont</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Acțiuni</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={user.id || user.email || index} hover>
                  <TableCell>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <PersonIcon sx={{ color: "#bdbdbd", mr: 1 }} />
                      <Typography variant="body2" fontWeight="500">
                        {user.firstName} {user.lastName}
                      </Typography>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.address || "-"}</TableCell>
                  <TableCell align="center">
                    {user.isAdmin ? (
                      <Chip label="Admin" color="primary" size="small" />
                    ) : (
                      <Chip label="User" variant="outlined" size="small" />
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteUser(user)}
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {users.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    align="center"
                    sx={{ py: 3, color: "gray" }}
                  >
                    Nu există utilizatori în baza de date.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/*DIALOG ADAUGARE */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Adaugă Utilizator</DialogTitle>
        <DialogContent dividers>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "15px",
            }}
          >
            <TextField
              label="Prenume (First Name)"
              name="firstName"
              value={newUser.firstName}
              onChange={handleInputChange}
              fullWidth
              required
            />
            <TextField
              label="Nume (Last Name)"
              name="lastName"
              value={newUser.lastName}
              onChange={handleInputChange}
              fullWidth
            />
          </div>

          <TextField
            margin="normal"
            label="Email"
            name="email"
            type="email"
            value={newUser.email}
            onChange={handleInputChange}
            fullWidth
            required
          />

          <TextField
            margin="normal"
            label="Parolă"
            name="password"
            type="password"
            value={newUser.password}
            onChange={handleInputChange}
            fullWidth
            required
            helperText="Parola va fi criptată automat."
          />

          <TextField
            margin="normal"
            label="Adresă Fizică"
            name="address"
            value={newUser.address}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={2}
          />

          <div style={{ marginTop: "15px" }}>
            <FormControlLabel
              control={
                <Switch
                  checked={newUser.isAdmin}
                  onChange={handleSwitchChange}
                  color="primary"
                />
              }
              label={
                newUser.isAdmin
                  ? "Cont Administrator"
                  : "Cont Utilizator Standard"
              }
            />
          </div>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpen(false)} color="inherit">
            Anulează
          </Button>
          <Button
            onClick={handleCreateUser}
            variant="contained"
            color="primary"
          >
            Salvează Utilizatorul
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Users;
