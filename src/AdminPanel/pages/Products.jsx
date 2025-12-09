import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  MenuItem,
  CircularProgress,
  IconButton,
  Box,
  Avatar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ImageIcon from "@mui/icons-material/Image";

const API_BASE_URL = "http://localhost:8080/api";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    brand: "",
    price: "",
    currency: "USD",
    stock: "",
    thumbnail: null,
    category: "",
  });

  // 1. ADAPTER (Normalizare date de la API)
  const normalizeProduct = (apiData) => {
    return {
      id: apiData.id,
      title: apiData.name || apiData.title || "No Title",
      slug:
        apiData.slug ||
        apiData.name?.toLowerCase().replace(/\s+/g, "-") ||
        "n/a",
      description: apiData.description || "",
      brand: apiData.brand || "",
      price: apiData.price || 0,
      currency: apiData.currency || "USD",
      stock: apiData.quantity || apiData.nrItems || 0,
      thumbnail: apiData.image || apiData.fileData || null,
      category: apiData.category || "",
    };
  };

  // LOAD (READ)
  const loadProducts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/product/search?search=`);
      if (!response.ok) throw new Error("Failed to fetch");
      const rawData = await response.json();
      const normalizedData = Array.isArray(rawData)
        ? rawData.map(normalizeProduct)
        : [];
      setProducts(normalizedData);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // HANDLERS

  // Resetarea formularului
  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      description: "",
      brand: "",
      price: "",
      currency: "USD",
      stock: "",
      thumbnail: null,
      category: "",
    });
    setEditId(null);
  };

  const handleOpenAdd = () => {
    resetForm();
    setOpen(true);
  };

  // Handler pentru click pe butonul Edit din tabel
  const handleEditClick = (product) => {
    setEditId(product.id);
    // Populam formularul cu datele existente
    setFormData({
      title: product.title,
      slug: product.slug,
      description: product.description,
      brand: product.brand,
      price: product.price,
      currency: product.currency,
      stock: product.stock,
      category: product.category,
      thumbnail: product.thumbnail,
    });
    setOpen(true);
  };

  // Functie unificată SAVE (Create sau Update)
  const handleSave = async () => {
    if (!formData.title || !formData.price || !formData.stock) {
      alert("Te rog completează Titlul, Prețul și Stocul!");
      return;
    }

    // Procesare Imagine
    let imageToSend = null;

    // Cazul 1: Avem un fisier nou selectat (File Object) -> Convertim la Base64
    if (formData.thumbnail && typeof formData.thumbnail === "object") {
      const toBase64 = (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result.split(",")[1]);
          reader.onerror = (error) => reject(error);
        });
      try {
        imageToSend = await toBase64(formData.thumbnail);
      } catch (error) {
        console.error("Error converting image", error);
        return;
      }
    }
    // Cazul 2: Avem o imagine veche (String Base64) si nu am schimbat-o
    else if (typeof formData.thumbnail === "string") {
      imageToSend = formData.thumbnail.startsWith("data:image")
        ? formData.thumbnail.split(",")[1]
        : formData.thumbnail;
    }

    // Payload pentru Java
    const payload = {
      id: editId, // Dacă e null, backend-ul știe că e creare
      name: formData.title,
      description: formData.description,
      slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, "-"),
      brand: formData.brand,
      price: Number(formData.price),
      quantity: Number(formData.stock),
      currency: formData.currency,
      category: formData.category,
      nrSold: 0,
      fileData: imageToSend,
    };

    try {
      let response;
      if (editId) {
        // --- UPDATE (PUT) ---
        response = await fetch(`${API_BASE_URL}/product`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        // --- CREATE (POST) ---
        response = await fetch(`${API_BASE_URL}/product`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (response.ok) {
        setOpen(false);
        resetForm();
        loadProducts(); // Refresh
      } else {
        alert("Eroare la salvare. Verifică Backend-ul.");
      }
    } catch (err) {
      console.error(err);
      alert("Eroare de conexiune.");
      console.log(JSON.stringify(payload));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await fetch(`${API_BASE_URL}/product/${id}`, { method: "DELETE" });
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const renderThumbnail = (base64String) => {
    if (!base64String) {
      return (
        <Avatar variant="rounded" sx={{ bgcolor: "grey.300" }}>
          <ImageIcon />
        </Avatar>
      );
    }
    const src = base64String.startsWith("data:image")
      ? base64String
      : `data:image/jpeg;base64,${base64String}`;
    return (
      <Avatar
        src={src}
        variant="rounded"
        sx={{ width: 56, height: 56, border: "1px solid #eee" }}
      />
    );
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography
          variant="h4"
          component="h1"
          fontWeight="bold"
          color="primary"
        >
          Inventory Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenAdd}
          size="large"
        >
          Add Product
        </Button>
      </Box>

      {isLoading ? (
        <Box display="flex" justifyContent="center" p={5}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} elevation={3}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead sx={{ bgcolor: "#263238" }}>
              <TableRow>
                <TableCell sx={{ color: "white" }}>Thumbnail</TableCell>
                <TableCell sx={{ color: "white" }}>ID</TableCell>
                <TableCell sx={{ color: "white" }}>Product Info</TableCell>
                <TableCell sx={{ color: "white" }}>Category / Brand</TableCell>
                <TableCell sx={{ color: "white" }}>Price</TableCell>
                <TableCell sx={{ color: "white" }}>Stock</TableCell>
                <TableCell align="right" sx={{ color: "white" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No products found.
                  </TableCell>
                </TableRow>
              ) : (
                products.map((p) => (
                  <TableRow key={p.id} hover>
                    <TableCell>{renderThumbnail(p.thumbnail)}</TableCell>
                    <TableCell
                      sx={{ color: "text.secondary", fontSize: "0.8rem" }}
                    >
                      #{p.id}
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight="bold">
                        {p.title}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ fontStyle: "italic" }}
                      >
                        /{p.slug}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{p.brand}</Typography>
                      <Box
                        component="span"
                        sx={{
                          bgcolor: "#e3f2fd",
                          color: "#1565c0",
                          px: 1,
                          py: 0.5,
                          borderRadius: 1,
                          fontSize: "0.7rem",
                        }}
                      >
                        {p.category}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography color="success.main" fontWeight="bold">
                        {p.price} {p.currency}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {p.stock > 0 ? (
                        <Typography variant="body2">{p.stock} pcs</Typography>
                      ) : (
                        <Typography
                          variant="caption"
                          color="error"
                          fontWeight="bold"
                        >
                          Out of Stock
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell align="right">
                      {/*Buton Edit */}
                      <IconButton
                        color="primary"
                        onClick={() => handleEditClick(p)}
                        sx={{ mr: 1 }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(p.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* DIALOG ADD / EDIT */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="md"
        fullWidth
      >
        {/* Titlu Dinamic */}
        <DialogTitle>{editId ? "Edit Product" : "Add New Product"}</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Product Title"
                name="title"
                fullWidth
                required
                value={formData.title}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Slug (URL)"
                name="slug"
                fullWidth
                value={formData.slug}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Brand"
                name="brand"
                fullWidth
                value={formData.brand}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Category"
                name="category"
                fullWidth
                value={formData.category}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <TextField
                    label="Price"
                    name="price"
                    type="number"
                    fullWidth
                    required
                    value={formData.price}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    select
                    label="Currency"
                    name="currency"
                    fullWidth
                    value={formData.currency}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="USD">USD</MenuItem>
                    <MenuItem value="EUR">EUR</MenuItem>
                    <MenuItem value="RON">RON</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
              <TextField
                label="Stock Quantity"
                name="stock"
                type="number"
                fullWidth
                required
                value={formData.stock}
                onChange={handleInputChange}
                sx={{ mt: 2, mb: 2 }}
              />

              <Box
                sx={{
                  border: "1px dashed grey",
                  p: 2,
                  borderRadius: 1,
                  textAlign: "center",
                }}
              >
                <Button
                  component="label"
                  variant="outlined"
                  startIcon={<CloudUploadIcon />}
                  sx={{ mb: 1 }}
                >
                  {editId ? "Change Thumbnail" : "Upload Thumbnail"}
                  <input
                    type="file"
                    hidden
                    onChange={(e) =>
                      setFormData({ ...formData, thumbnail: e.target.files[0] })
                    }
                  />
                </Button>
                {/* Afisam numele fisierului daca e nou, sau "Existing Image" daca editam */}
                {formData.thumbnail &&
                  typeof formData.thumbnail === "object" && (
                    <Typography variant="caption" display="block">
                      Selected: {formData.thumbnail.name}
                    </Typography>
                  )}
                {editId && typeof formData.thumbnail === "string" && (
                  <Typography
                    variant="caption"
                    display="block"
                    color="text.secondary"
                  >
                    Current image retained
                  </Typography>
                )}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                name="description"
                fullWidth
                multiline
                rows={3}
                value={formData.description}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            {editId ? "Update Product" : "Save Product"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Products;
