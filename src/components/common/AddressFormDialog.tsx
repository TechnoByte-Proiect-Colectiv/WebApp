import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Address } from "../../types/user/address";

interface AddressFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (address: Partial<Address>) => Promise<void>; // Promise pt loading state
  initialData?: Partial<Address>;
  title: string;
}

export const AddressFormDialog: React.FC<AddressFormDialogProps> = ({
  open,
  onClose,
  onSave,
  initialData,
  title,
}) => {
  const [formData, setFormData] = useState<Partial<Address>>({});
  const [loading, setLoading] = useState(false);

  // Resetam formularul cand se deschide modalul
  useEffect(() => {
    if (open) {
      setFormData(initialData || { type: "shipping", isPrimary: false });
    }
  }, [open, initialData]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.street || !formData.city || !formData.phoneNumber) {
      alert("Please fill in required fields (Street, City, Phone)");
      return;
    }
    setLoading(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2} sx={{ mt: 0.5 }}>
          <Grid size={{xs:12, sm:6}}>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                name="type"
                value={formData.type || "shipping"}
                label="Type"
                onChange={handleChange}
              >
                <MenuItem value="shipping">Shipping</MenuItem>
                <MenuItem value="billing">Billing</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{xs:12, sm:6}}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber || ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{xs:12, sm:6}}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formData.firstName || ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{xs:12, sm:6}}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName || ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{xs:12}}>
            <TextField
              fullWidth
              label="Street Address"
              name="street"
              value={formData.street || ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{xs:12, sm:6}}>
            <TextField
              fullWidth
              label="City"
              name="city"
              value={formData.city || ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{xs:12, sm:6}}>
            <TextField
              fullWidth
              label="County/State"
              name="county"
              value={formData.county || ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{xs:12, sm:6}}>
            <TextField
              fullWidth
              label="Postal Code"
              name="postalCode"
              value={formData.postalCode || ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{xs:12, sm:6}}>
            <TextField
              fullWidth
              label="Country"
              name="country"
              value={formData.country || ""}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};