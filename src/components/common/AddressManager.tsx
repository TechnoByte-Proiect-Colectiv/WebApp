import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  Avatar,
  Divider,
  Collapse,
} from "@mui/material";
import EditIcon from "@mui/icons-material/EditRounded";
import AddIcon from "@mui/icons-material/AddRounded";
import SettingsIcon from "@mui/icons-material/SettingsRounded";
import CheckCircleIcon from "@mui/icons-material/CheckCircleRounded";
import LocalShippingIcon from "@mui/icons-material/LocalShippingRounded";
import HomeWorkIcon from "@mui/icons-material/HomeWorkRounded";
import StarIcon from "@mui/icons-material/StarRounded";
import { Address } from "../../types/user/address";
import { DeleteForever } from "@mui/icons-material";

interface AddressManagerProps {
  addresses: Address[];
  selectedAddressId?: string;
  onSelectAddress: (id: string) => void;
  onEditAddress: (address: Address) => void;
  onDeleteAddress: (id: string) => void;
  onAddAddress: () => void;
  allowSelection?: boolean;
}

export const AddressManager: React.FC<AddressManagerProps> = ({
  addresses,
  selectedAddressId,
  onSelectAddress,
  onEditAddress,
  onDeleteAddress,
  onAddAddress,
  allowSelection = true,
}) => {
  const [isManaging, setIsManaging] = useState(false);

  return (
    <Box width="100%">
      {/* --- HEADER --- */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Box>
          {/* <Typography variant="h6" fontWeight="bold"> */}
            {/* Address Book */}
          {/* </Typography> */}
          {/* <Typography variant="body2" color="text.secondary"> */}
            {/* Manage your shipping and billing locations */}
          {/* </Typography> */}
        </Box>

        <Box display="flex" gap={1}>
          <Button
            startIcon={<SettingsIcon />}
            onClick={() => setIsManaging(!isManaging)}
            size="small"
            color="inherit"
          >
            {isManaging ? "Done" : "Manage"}
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onAddAddress}
            size="small"
            sx={{ borderRadius: 2 }}
          >
            Add New
          </Button>
        </Box>
      </Box>

      <Grid container spacing={2}>
        {addresses.map((addr) => {
          const isSelected = selectedAddressId === addr.id;
          const isShipping = addr.type === "shipping";
          const canSelect = allowSelection && !isManaging;

          return (
            <Grid
              sx={{
                xs: 12,
                md: 6,
              }}
              key={addr.id}
            >
              <Card
                variant="outlined"
                onClick={() => canSelect && onSelectAddress(addr.id)}
                sx={{
                  position: "relative",
                  cursor: canSelect ? "pointer" : "default",
                  borderRadius: 2,
                  borderWidth: 2,
                  minWidth: 300,
                  maxWidth: 400,
                  borderColor: isSelected ? "primary.main" : "divider",
                  bgcolor: isSelected ? "primary.50" : "background.paper",
                  "&:hover": { boxShadow: canSelect ? 3 : 0 },
                }}
              >
                {isSelected && !isManaging && (
                  <CheckCircleIcon
                    color="primary"
                    sx={{ position: "absolute", top: 12, right: 12 }}
                  />
                )}

                <CardContent>
                  <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <Avatar
                      variant="rounded"
                      sx={{
                        bgcolor: isShipping ? "error.light" : "info.light",
                        color: "white",
                      }}
                    >
                      {isShipping ? <LocalShippingIcon /> : <HomeWorkIcon />}
                    </Avatar>

                    <Box>
                      <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        lineHeight={1.2}
                      >
                        {addr.firstName} {addr.lastName}
                        {addr.isPrimary && (
                          <StarIcon
                            sx={{
                              fontSize: 16,
                              color: "#FFD700",
                              ml: 0.5,
                              mb: 0.5,
                            }}
                          />
                        )}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        textTransform="uppercase"
                      >
                        {addr.type} Address
                      </Typography>
                    </Box>
                  </Box>

                  <Box color="text.secondary" fontSize="0.875rem">
                    <Typography color="text.primary" fontWeight={500}>
                      {addr.street}
                    </Typography>
                    <Typography>
                      {addr.city}, {addr.county}
                    </Typography>
                    <Typography mb={1}>
                      {addr.postalCode}, {addr.country}
                    </Typography>

                    <Box display="flex" gap={1}>
                      <Chip label={addr.phoneNumber} size="small" />
                      {addr.isPrimary && (
                        <Chip label="Default" size="small" color="primary" />
                      )}
                    </Box>
                  </Box>
                </CardContent>

                <Collapse in={isManaging}>
                  <Divider />
                  <Box p={1.5} display="flex" gap={1} bgcolor="action.hover">
                    <Button
                      fullWidth
                      variant="contained"
                      size="small"
                      startIcon={<EditIcon />}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditAddress(addr);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      fullWidth
                      variant="contained"
                      color="error"
                      size="small"
                      startIcon={<DeleteForever />}
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteAddress(addr.id);
                      }}
                    >
                      Delete
                    </Button>
                  </Box>
                </Collapse>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};
